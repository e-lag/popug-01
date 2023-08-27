import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  eventPayloadWrapper,
  UserRoleChangedEventV1,
} from 'event-contracts/dist';

import { UserRoleChangedEvent } from './user-role-changed.event';

@EventsHandler(UserRoleChangedEvent)
export class UserRoleChangedEventHandler
  implements IEventHandler<UserRoleChangedEvent>
{
  private _logger = new Logger(UserRoleChangedEventHandler.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: UserRoleChangedEvent): Promise<void> {
    this._logger.log({ event });
    const { user } = event;
    const userEvent: UserRoleChangedEventV1 = eventPayloadWrapper(
      'user-role-changed',
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
      UserRoleChangedEventV1.exchange,
      UserRoleChangedEventV1.routingKey,
      userEvent,
    );
  }
}
