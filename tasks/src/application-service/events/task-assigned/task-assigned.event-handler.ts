import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { eventPayloadWrapper } from 'event-contracts/dist';
import {
  TaskAssignedEventV1,
  TaskAssignedEventV1Payload,
} from 'event-contracts/dist/task/task-assigned/v1/task-assigned.event.v1.dto';
import { TaskAssignedEvent } from './task-assigned.event';

@EventsHandler(TaskAssignedEvent)
export class TaskAssignedEventHandler
  implements IEventHandler<TaskAssignedEvent>
{
  private _logger = new Logger(TaskAssignedEventHandler.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: TaskAssignedEvent): Promise<void> {
    this._logger.log({ event });

    const eventPayload: TaskAssignedEventV1Payload = {
      ...event.task,
      assigner: event.task.assigner.id,
    };

    await this.amqpConnection.publish<TaskAssignedEventV1>(
      TaskAssignedEventV1.exchange,
      TaskAssignedEventV1.routingKey,
      eventPayloadWrapper('task-assigned', 'v1', eventPayload),
    );
  }
}
