import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { eventPayloadWrapper } from 'event-contracts/dist';
import {
  TaskFinishedEventV1,
  TaskFinishedEventV1Payload,
} from 'event-contracts/dist/task/task-finished/v1/task-finished.event.v1.dto';

import { TaskFinishedEvent } from './task-finished.event';

@EventsHandler(TaskFinishedEvent)
export class TaskFinishedEventHandler
  implements IEventHandler<TaskFinishedEvent>
{
  private _logger = new Logger(TaskFinishedEvent.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: TaskFinishedEvent): Promise<void> {
    this._logger.log({ event });

    const eventPayload: TaskFinishedEventV1Payload = {
      ...event.task,
      assigner: event.task.assigner.id,
    };

    await this.amqpConnection.publish<TaskFinishedEventV1>(
      TaskFinishedEventV1.exchange,
      TaskFinishedEventV1.routingKey,
      eventPayloadWrapper('task-finished', 'v1', eventPayload),
    );
  }
}
