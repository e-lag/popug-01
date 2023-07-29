import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomain } from '../../../domain/user.domain';
import { UserErrors } from '../../../infrastructure/user.errors';
import { PasswordChangeCommand } from './password-change.command';

@CommandHandler(PasswordChangeCommand)
export class PasswordChangeCommandHandler
  implements ICommandHandler<PasswordChangeCommand>
{
  constructor(private readonly em: EntityManager) {}

  public async execute(command: PasswordChangeCommand): Promise<void> {
    const user = await this.em.findOne(UserDomain, { id: command.userId });

    if (!user) {
      throw new Error(UserErrors.NotFound);
    }

    if (!user.passwordIsCorrectCheck(command.passwordCurrent)) {
      throw new Error(UserErrors.IncorrectPassword);
    }

    if (command.passwordNew !== command.passwordNewConfirm) {
      throw new Error(UserErrors.PasswordCompareFail);
    }

    user.passwordSet(command.passwordNew);

    await this.em.flush();
  }
}
