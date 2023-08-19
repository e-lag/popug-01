import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  UserRoleChangedEventDto,
  USERS_FANOUT_EXCHANGE,
} from '../../../infrastructure/contracts/users-stream';

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
    const userEvent: UserRoleChangedEventDto = {
      id: user.id,
      operation: 'user-role-changed',
      data: {
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
    };
    await this.amqpConnection.publish(
      USERS_FANOUT_EXCHANGE.name,
      userEvent.operation,
      userEvent,
    );
  }
}
