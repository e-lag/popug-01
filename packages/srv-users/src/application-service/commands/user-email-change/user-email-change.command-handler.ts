import { EntityManager } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { INTERVAL_1_DAY } from '@popug/common';

import { User } from '../../../entities/user.entity';
import { UserEmailConfirm } from '../../../entities/user-email-confirm.entity';
import { UserErrors } from '../../../infrastructure/user.errors';
import { UserRepositoryAdapter } from '../../../infrastructure/user.repository-adapter';
import { UserEmailChangeCommand } from './user-email-change.command';

@CommandHandler(UserEmailChangeCommand)
export class UserEmailChangeCommandHandler implements ICommandHandler<UserEmailChangeCommand> {
  private _logger = new Logger(UserEmailChangeCommandHandler.name);

  constructor(private readonly userRepository: UserRepositoryAdapter, private readonly em: EntityManager) {}

  public async execute(command: UserEmailChangeCommand): Promise<void> {
    const user = await this.em.findOne(User, { id: command.userId });

    if (!user) {
      throw new Error(UserErrors.NotFound);
    }

    // готовим код для email и фиксируем его
    const code: string = this.userRepository.userEmailConfirmCodeGenerate();

    const activeUntilTime = INTERVAL_1_DAY + new Date().getTime();

    const userEmailConfirm = new UserEmailConfirm({
      userId: user.id,
      email: user.email,
      code,
      confirmed: false,
      activeUntil: new Date(activeUntilTime),
    });

    this.em.persist([userEmailConfirm]);
    await this.em.flush();
    this._logger.verbose('send email confirm');
    // отправляем письмо
    // await this.userRepository.userSendEmail(EmailTemplateEnum.EmailConfirm, {
    //   email: user.email,
    //   code,
    // });
  }
}
