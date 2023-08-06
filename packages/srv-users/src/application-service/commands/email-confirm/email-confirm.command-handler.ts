import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { User } from '../../../entities/user.entity';
import { UserEmailConfirm } from '../../../entities/user-email-confirm.entity';
import { UserErrors } from '../../../infrastructure/user.errors';
import { UserChangedEvent } from '../../events-cud/user-changed/user-changed.event';
import { EmailConfirmCommand } from './email-confirm.command';

@CommandHandler(EmailConfirmCommand)
export class EmailConfirmCommandHandler implements ICommandHandler<EmailConfirmCommand> {
  constructor(private readonly em: EntityManager, private readonly eventBus: EventBus) {}

  public async execute(command: EmailConfirmCommand): Promise<void> {
    const user = await this.em.findOne(User, { id: command.userId });

    if (!user) {
      throw new Error(UserErrors.NotFound);
    }

    const userEmailConfirm = await this.em.findOne(UserEmailConfirm, {
      $and: [
        {
          userId: command.userId,
          email: command.email,
          activeUntil: { $gt: new Date() },
          confirmed: false,
        },
      ],
    });

    if (!userEmailConfirm?.code || userEmailConfirm.code !== command.confirmCode) {
      throw new Error(UserErrors.ConfirmCodeIncorrect);
    }

    user.emailConfirmSet(command.email);
    userEmailConfirm.confirmed = true;
    await this.em.flush();
    this.eventBus.publish(new UserChangedEvent(user));
  }
}
