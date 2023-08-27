import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  CudTypeEvents,
  eventPayloadWrapper,
  UserCreatedStreamEventV1,
} from 'event-contracts/dist';

import { UserCreatedEvent } from './user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  private _logger = new Logger(UserCreatedEventHandler.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: UserCreatedEvent): Promise<void> {
    this._logger.log({ event });
    const { user } = event;
    const userEvent: UserCreatedStreamEventV1 = eventPayloadWrapper(
      CudTypeEvents.CREATED,
      'v1',
      {
        id: user.id,
        email: user.email,
        role: user.role.toString(),
        nikName: user.nikName,
        phone: user.phone,
        avatar: user.avatar,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    );
    await this.amqpConnection.publish(
      UserCreatedStreamEventV1.exchange,
      UserCreatedStreamEventV1.routingKey,
      userEvent,
    );
  }
}
