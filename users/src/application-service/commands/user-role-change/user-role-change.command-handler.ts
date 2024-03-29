import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../../enitities/user.entity';

import { UserErrors } from '../../../infrastructure/user.errors';
import { UserChangedEvent } from '../../events-streaming/user-changed/user-changed.event';
import { UserRoleChangedEvent } from '../../events/user-role-changed/user-role-changed.event';
import { UserRoleChangeCommand } from './user-role-change.command';

@CommandHandler(UserRoleChangeCommand)
export class UserRoleChangeCommandHandler
  implements ICommandHandler<UserRoleChangeCommand>
{
  constructor(
    private readonly em: EntityManager,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: UserRoleChangeCommand): Promise<void> {
    // const user = await this.userSrv.user(command.userId);
    const user = await this.em.findOne(User, { id: command.userId });

    if (!user) {
      throw new Error(UserErrors.NotFound);
    }

    user.role = command.role;

    await this.em.flush();
    this.eventBus.publish(new UserRoleChangedEvent(user));
    this.eventBus.publish(new UserChangedEvent(user));
  }
}
