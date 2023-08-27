import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Account } from '../../../enitities/account.entity';
import { BalanceQuery } from './balance.query';

@QueryHandler(BalanceQuery)
export class BalanceQueryHandler implements IQueryHandler<BalanceQuery> {
  constructor(private readonly em: EntityManager) {}

  public async execute(query: BalanceQuery): Promise<Pick<Account, 'balance'>> {
    const account = await this.em.findOne(Account, {
      assigner: query.userId,
      close: false,
    });
    return { balance: account.balance || 0 };
  }
}
