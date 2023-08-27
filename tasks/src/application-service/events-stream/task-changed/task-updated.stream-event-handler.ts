import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CudTypeEvents, eventPayloadWrapper } from 'event-contracts/dist';
import {
  TaskStreamPayloadV1,
  TaskUpdatedStreamEventV1,
} from 'event-contracts/dist/task/task-streaming/v1/tasks.stream-events.v1';
import { TaskUpdatedStreamEvent } from './task-updated.stream-event';

@EventsHandler(TaskUpdatedStreamEvent)
export class TaskUpdatedStreamEventHandler
  implements IEventHandler<TaskUpdatedStreamEvent>
{
  private _logger = new Logger(TaskUpdatedStreamEventHandler.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: TaskUpdatedStreamEvent): Promise<void> {
    this._logger.log({ event });

    const eventPayload: TaskStreamPayloadV1 = {
      ...event.task,
      assigner: event.task.assigner.id,
    };

    await this.amqpConnection.publish<TaskUpdatedStreamEventV1>(
      TaskUpdatedStreamEventV1.exchange,
      TaskUpdatedStreamEventV1.routingKey,
      eventPayloadWrapper(CudTypeEvents.UPDATED, 'v1', eventPayload),
    );
  }
}
