import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StreamEventTypes } from '../../../infrastructure/contracts/cud-type-events.enum';
import {
  UserCreateStreamEventDto,
  USERS_FANOUT_EXCHANGE,
} from '../../../infrastructure/contracts/users-stream';

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
    //| UserUpdateCudEventDto
    const userEvent: UserCreateStreamEventDto = {
      id: user.id,
      operation: StreamEventTypes.CREATE,
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
