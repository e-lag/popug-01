import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../../enitities/user.entity';
import { UserProfile } from '../../../types/user-profile.type';
import { UsersQuery } from './users.query';

@QueryHandler(UsersQuery)
export class UsersQueryHandler implements IQueryHandler<UsersQuery> {
  constructor(private readonly em: EntityManager) {}

  public async execute(
    query: UsersQuery,
  ): Promise<{ users: UserProfile[]; count: number }> {
    const users = await this.em.findAndCount(
      User,
      {},
      { limit: query.limit, offset: query.offset },
    );

    return {
      users: users[0].map((user) => ({
        avatar: user.avatar,
        email: user.email,
        emailConfirmed: user.emailConfirmed,
        nikName: user.nikName,
        phone: user.phone,
        role: user.role,
      })),
      count: users[1],
    };
  }
}
