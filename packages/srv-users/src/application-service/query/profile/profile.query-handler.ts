import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from '../../../entities/user.entity';
import { UserErrors } from '../../../infrastructure/user.errors';
import { UserProfile } from '../../../types/user-profile.type';
import { ProfileQuery } from './profile.query';

@QueryHandler(ProfileQuery)
export class ProfileQueryHandler implements IQueryHandler<ProfileQuery> {
  constructor(private readonly em: EntityManager) {}

  public async execute(query: ProfileQuery): Promise<UserProfile> {
    const user = await this.em.findOne(User, { id: query.id });

    if (!user) {
      throw new Error(UserErrors.NotFound);
    }

    return {
      avatar: user.avatar,
      email: user.email,
      emailConfirmed: user.emailConfirmed,
      nikName: user.nikName,
      phone: user.phone,
    };
  }
}
