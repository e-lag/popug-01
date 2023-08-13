import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from '../../enitities/user.entity';
import { UserRoles } from '../../types/user-roles.enum';
import { CudTypeEvents } from '../contracts/cud-type-events.enum';
import {
  USERS_FANOUT_EXCHANGE,
  UserStreamEvent,
  UserUpdateStreamEventDto,
} from '../contracts/users-stream-events';

@Injectable()
export class UserStreamingSubscriber {
  constructor(private readonly em: EntityManager) {}

  @RabbitSubscribe({
    exchange: USERS_FANOUT_EXCHANGE.name,
    routingKey: 'task-srv',
    queue: USERS_FANOUT_EXCHANGE.name + '-task-srv',
  })
  public async userCudEvents(event: UserStreamEvent): Promise<void> {
    switch (event.operation) {
      case CudTypeEvents.CREATE:
        this.em.create(User, this.userEntityGet(event.data));
        await this.em.flush();
        return;
      case CudTypeEvents.UPDATE:
        await this.em.nativeUpdate(
          User,
          { id: event.id },
          this.userEntityGet(event.data),
        );
        return;
      default:
        return;
    }
  }

  private userEntityGet(props: UserUpdateStreamEventDto['data']): User {
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
