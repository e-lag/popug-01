import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User } from '../../../entities/user.entity';
import { UserErrors } from '../../../infrastructure/user.errors';
import { NikNameChangeCommand } from './nik-name-change.command';

@CommandHandler(NikNameChangeCommand)
export class NikNameChangeCommandHandler
  implements ICommandHandler<NikNameChangeCommand>
{
  constructor(private readonly em: EntityManager) {}

  public async execute(command: NikNameChangeCommand): Promise<void> {
    const user = await this.em.findOne(User, { id: command.userId });

    if (!user) {
      throw new Error(UserErrors.NotFound);
    }

    user.nikName = command.nikName;
    await this.em.flush();
  }
}
