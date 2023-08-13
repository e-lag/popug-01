import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../../enitities/user.entity';

import { UserErrors } from '../../../infrastructure/user.errors';
import { UserChangedEvent } from '../../events-cud/user-changed/user-changed.event';
import { AvatarAddCommand } from './avatar-add.command';

@CommandHandler(AvatarAddCommand)
export class AvatarAddCommandHandler
  implements ICommandHandler<AvatarAddCommand>
{
  constructor(
    private readonly em: EntityManager,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: AvatarAddCommand): Promise<void> {
    // const user = await this.userSrv.user(command.userId);
    const user = await this.em.findOne(User, { id: command.userId });

    if (!user) {
      throw new Error(UserErrors.NotFound);
    }

    user.avatar = command.avatar;

    await this.em.flush();
    this.eventBus.publish(new UserChangedEvent(user));
  }
}
