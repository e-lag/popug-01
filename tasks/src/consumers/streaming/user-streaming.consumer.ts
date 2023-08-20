import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import {
  UserCreatedStreamEventV1,
  UserUpdatedStreamEventV1,
} from 'event-contracts/dist';
import { User } from '../../enitities/user.entity';
import { UserRoles } from '../../types/user-roles.enum';

@Injectable()
export class UserStreamingConsumer {
  constructor(private readonly em: EntityManager) {}

  @RabbitSubscribe({
    exchange: UserCreatedStreamEventV1.exchange,
    routingKey: UserCreatedStreamEventV1.routingKey,
    queue:
      UserCreatedStreamEventV1.exchange +
      UserCreatedStreamEventV1.routingKey +
      '-task-srv',
  })
  public async userCreatedStreamEvent(
    eventPayload: UserCreatedStreamEventV1,
  ): Promise<void> {
    const { event } = eventPayload;
    this.em.create(User, this.userEntityGet(event));
    await this.em.flush();
  }

  @RabbitSubscribe({
    exchange: UserUpdatedStreamEventV1.exchange,
    routingKey: UserUpdatedStreamEventV1.routingKey,
    queue:
      UserUpdatedStreamEventV1.exchange +
      UserUpdatedStreamEventV1.routingKey +
      '-task-srv',
  })
  public async userUpdatedStreamEvent(
    eventPayload: UserUpdatedStreamEventV1,
  ): Promise<void> {
    const { event } = eventPayload;
    await this.em.nativeUpdate(
      User,
      { id: event.id },
      this.userEntityGet(event),
    );
  }

  private userEntityGet(
    props:
      | UserUpdatedStreamEventV1['event']
      | UserCreatedStreamEventV1['event'],
  ): User {
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
