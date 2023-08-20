import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommitBalanceCommand } from './commit-balance.command';

@CommandHandler(CommitBalanceCommand)
export class CommitBalanceCommandHandler
  implements ICommandHandler<CommitBalanceCommand>
{
  constructor(private readonly em: EntityManager) {}

  public execute(command: CommitBalanceCommand): Promise<any> {
    return Promise.resolve(undefined);
  }
}
