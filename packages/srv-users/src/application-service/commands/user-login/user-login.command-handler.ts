import { EntityManager } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomain } from '../../../domain/user.domain';
import { UserLogin } from '../../../entities/user-login.entity';
import { UserErrors } from '../../../infrastructure/user.errors';
import { UserRepositoryAdapter } from '../../../infrastructure/user.repository-adapter';
import { UserProfile } from '../../../types/user-profile.type';
import { UserLoginCommand } from './user-login.command';

@CommandHandler(UserLoginCommand)
export class UserLoginCommandHandler
  implements ICommandHandler<UserLoginCommand>
{
  private _logger = new Logger(UserLoginCommandHandler.name);

  constructor(
    private readonly em: EntityManager,
    private readonly userRepository: UserRepositoryAdapter,
  ) {}

  public async execute(command: UserLoginCommand): Promise<{
    profile: UserProfile;
    accessToken: string;
  }> {
    this._logger.verbose('execute');
    const user = await this.em.findOne(UserDomain, { email: command.email });

    if (!user) {
      throw new Error(UserErrors.NotFound);
    }

    this._logger.debug({ user });

    if (user.blockUntil && user.blockUntil?.getTime() > new Date().getTime()) {
      throw new Error(UserErrors.AccountBlocked);
    }

    if (!user.passwordIsCorrectCheck(command.password)) {
      user.errorLoginAdd();
      this.em.flush();
      throw new Error(UserErrors.IncorrectPassword);
    }

    if (user.countErrorLogins > 0) {
      user.errorLoginReset();
    }

    const accessToken = this.userRepository.getAccessToken(user);
    const userLoginLog = new UserLogin({
      userId: user.id,
      deviceId: '',
      active: true,
      refreshToken: '',
    });
    this.em.persist(userLoginLog);

    await this.em.flush();
    return {
      accessToken,
      profile: {
        avatar: user.avatar,
        email: user.email,
        emailConfirmed: user.emailConfirmed,
        nikName: user.nikName,
        phone: user.phone,
      },
    };
  }
}
