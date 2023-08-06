import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CudTypeEvents, UserCreateCudEventDto, USERS_CUD_EXCHANGE } from '@popug/contracts';

import { UserCreatedEvent } from './user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler implements IEventHandler<UserCreatedEvent> {
  private _logger = new Logger(UserCreatedEventHandler.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: UserCreatedEvent): Promise<void> {
    this._logger.log({ event });
    const { user } = event;
    //| UserUpdateCudEventDto
    const userEvent: UserCreateCudEventDto = {
      id: user.id,
      operation: CudTypeEvents.CREATE,
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
    await this.amqpConnection.publish(USERS_CUD_EXCHANGE.name, '', userEvent);
  }
}
