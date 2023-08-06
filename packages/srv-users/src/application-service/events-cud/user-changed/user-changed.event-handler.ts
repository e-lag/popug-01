import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CudTypeEvents, USERS_CUD_EXCHANGE, UserUpdateCudEventDto } from '@popug/contracts';

import { UserChangedEvent } from './user-changed.event';

@EventsHandler(UserChangedEvent)
export class UserChangedEventHandler implements IEventHandler<UserChangedEvent> {
  private _logger = new Logger(UserChangedEventHandler.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: UserChangedEvent): Promise<void> {
    this._logger.log({ event });
    const { user } = event;
    const userEvent: UserUpdateCudEventDto = {
      id: user.id,
      operation: CudTypeEvents.UPDATE,
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
