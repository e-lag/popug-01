import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomain } from '../../../domain/user.domain';
import { UserLogin } from '../../../entities/user-login.entity';
import { UserErrors } from '../../../infrastructure/user.errors';
import { UserLogoutCommand } from './user-logout.command';

@CommandHandler(UserLogoutCommand)
export class UserLogoutCommandHandler
  implements ICommandHandler<UserLogoutCommand>
{
  constructor(private readonly em: EntityManager) {}

  public async execute(command: UserLogoutCommand): Promise<void> {
    const user = await this.em.findOne(UserDomain, { id: command.userId });

    if (!user) {
      throw new Error(UserErrors.NotFound);
    }

    const userLogin = await this.em.findOne(UserLogin, {
      active: true,
      refreshToken: command.token,
    });

    if (!userLogin) {
      return;
    }

    userLogin.active = false;

    //TODO: закрытие рефреша устройства
    await this.em.flush();
  }
}