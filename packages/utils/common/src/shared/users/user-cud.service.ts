import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CudTypeEvents, UserCudEvent } from '@popug/contracts';

import { User } from './user.entity';
import { UserRoles } from './user-roles.enum';

@Injectable()
export class UserCudService {
  constructor(private readonly em: EntityManager) {}

  public async userCudEventHandler(event: UserCudEvent): Promise<void> {
    switch (event.operation) {
      case CudTypeEvents.CREATE:
        this.em.create(User, this.userEntityGet(event.data));
        await this.em.flush();
        return;
      case CudTypeEvents.UPDATE:
        await this.em.nativeUpdate(User, { id: event.id }, this.userEntityGet(event.data));
        return;
      default:
        return;
    }
  }

  private userEntityGet(props: UserCudEvent['data']): User {
    return {
      id: props.id,
      avatar: props.avatar,
      email: props.email,
      role: (props.role as unknown as UserRoles) || UserRoles.CUSTOMER,
      nikName: props.nikName,
      phone: props.phone,
      isActive: props.isActive,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
