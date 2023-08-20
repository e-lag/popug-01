import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  CudTypeEvents,
  eventPayloadWrapper,
  UserUpdatedStreamEventV1,
} from 'event-contracts/dist';

import { UserChangedEvent } from './user-changed.event';

@EventsHandler(UserChangedEvent)
export class UserChangedEventHandler
  implements IEventHandler<UserChangedEvent>
{
  private _logger = new Logger(UserChangedEventHandler.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: UserChangedEvent): Promise<void> {
    this._logger.log({ event });
    const { user } = event;

    const userEvent: UserUpdatedStreamEventV1 = eventPayloadWrapper(
      CudTypeEvents.UPDATED,
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
      UserUpdatedStreamEventV1.exchange,
      UserUpdatedStreamEventV1.routingKey,
      userEvent,
    );
  }
}
