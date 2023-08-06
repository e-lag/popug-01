import { EntityManager } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { INTERVAL_1_DAY, UuidGenerator } from '@popug/common';

import { RegisterResponseDto } from '../../../dtos';
import { User } from '../../../entities/user.entity';
import { UserEmailConfirm } from '../../../entities/user-email-confirm.entity';
import { UserLogin } from '../../../entities/user-login.entity';
import { UserErrors } from '../../../infrastructure/user.errors';
import { UserRepositoryAdapter } from '../../../infrastructure/user.repository-adapter';
import { UserRoles } from '../../../types/user-roles.enum';
import { UserCreatedEvent } from '../../events-cud/user-created/user-created.event';
import { UserRegisterCommand } from './user-register.command';

@CommandHandler(UserRegisterCommand)
export class UserRegisterCommandHandler implements ICommandHandler<UserRegisterCommand> {
  private _logger = new Logger(UserRegisterCommandHandler.name);

  constructor(
    private readonly em: EntityManager,
    private readonly userRepository: UserRepositoryAdapter,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: UserRegisterCommand): Promise<RegisterResponseDto> {
    this._logger.verbose('create user');
    // проверяем не занят ли email
    const userWithEmail = await this.em.findOne(User, {
      email: command.email,
    });

    if (userWithEmail) {
      throw new Error(UserErrors.EmailIsBusy);
    }

    // сходятся пароли?
    if (command.password !== command.passwordConfirm) {
      throw new Error(UserErrors.PasswordCompareFail);
    }

    this._logger.verbose('all ok - creating');
    // создаем пользователя
    const user = new User({
      avatar: undefined,
      blockUntil: null,
      countErrorLogins: 0,
      email: command.email,
      emailConfirmed: false,
      role: UserRoles.CUSTOMER,
      nikName: undefined,
      password: null,
      phone: undefined,
      isActive: true,
    });
    user.id = UuidGenerator.generate();
    this._logger.verbose('set pass');
    // ставим пароль
    user.passwordSet(command.password);

    this._logger.verbose('save user');
    this._logger.debug(user);
    // сохраняем пользователя
    this.em.persist(user);
    // await this.userRepository.userSave(user);
    this._logger.verbose('generate confirm code');
    // готовим код для email и фиксируем его
    const code: string = this.userRepository.userEmailConfirmCodeGenerate();
    this._logger.verbose('send email confirm', {
      email: user.email,
      code,
    });

    // отправляем письмо
    // await this.userRepository.userSendEmail(EmailTemplateEnum.EmailConfirm, {
    //   email: command.email,
    //   // email: user.email,
    //   code,
    // });

    const activeUntilTime = INTERVAL_1_DAY + new Date().getTime();

    const userEmailConfirm = new UserEmailConfirm({
      userId: user.id,
      email: user.email,
      code,
      confirmed: false,
      activeUntil: new Date(activeUntilTime),
    });

    this.em.persist([userEmailConfirm]);

    this._logger.verbose('generating tokens');
    // генерим токены
    const accessToken = this.userRepository.getAccessToken(user);
    // const refreshToken = await this.userRepository.getRefreshToken(user.value);
    this._logger.verbose('save login info');
    // сохраняем инфу о входе
    const userLogin = new UserLogin({
      userId: user.id,
      active: true,
      deviceId: '',
      refreshToken: accessToken,
    });
    this.em.persist(userLogin);
    await this.em.flush();
    this.eventBus.publish(new UserCreatedEvent(user));
    return {
      accessToken,
      profile: {
        avatar: user.avatar,
        email: user.email,
        emailConfirmed: user.emailConfirmed,
        nikName: user.nikName,
        phone: user.phone,
        role: user.role,
      },
    };
  }
}
