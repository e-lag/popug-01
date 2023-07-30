import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User } from '../../../entities/user.entity';
import { UserErrors } from '../../../infrastructure/user.errors';
import { AvatarAddCommand } from './avatar-add.command';

@CommandHandler(AvatarAddCommand)
export class AvatarAddCommandHandler
  implements ICommandHandler<AvatarAddCommand>
{
  constructor(private readonly em: EntityManager) {}

  public async execute(command: AvatarAddCommand): Promise<void> {
    // const user = await this.userSrv.user(command.userId);
    const user = await this.em.findOne(User, { id: command.userId });

    if (!user) {
      throw new Error(UserErrors.NotFound);
    }

    user.avatar = command.avatar;

    await this.em.flush();
  }
}
