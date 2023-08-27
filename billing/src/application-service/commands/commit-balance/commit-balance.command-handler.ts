import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Account } from '../../../enitities/account.entity';
import { CommitBalanceCommand } from './commit-balance.command';

@CommandHandler(CommitBalanceCommand)
export class CommitBalanceCommandHandler
  implements ICommandHandler<CommitBalanceCommand>
{
  constructor(private readonly em: EntityManager) {}

  public async execute(): Promise<any> {
    const em = this.em.fork();

    const accounts = await em.find(Account, { close: false });

    const total = {
      sum: 0,
      maxPrice: 0,
      minPrice: 0,
    };
    for (const account of accounts) {
      account.close = true;
      total.sum += account.balance;
      total.maxPrice =
        total.maxPrice < account.mostExpensiveTask
          ? account.mostExpensiveTask
          : total.maxPrice;
      total.minPrice =
        total.minPrice > account.mostExpensiveTask
          ? account.mostExpensiveTask
          : total.minPrice;
    }
    await em.flush();
    return Promise.resolve(undefined);
  }
}
