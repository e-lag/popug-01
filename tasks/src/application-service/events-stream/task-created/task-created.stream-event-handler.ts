import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CudTypeEvents, eventPayloadWrapper } from 'event-contracts/dist';
import {
  TaskCreatedStreamEventV1,
  TaskStreamPayloadV1,
} from 'event-contracts/dist/task/task-streaming/v1/tasks.stream-events.v1';
import { TaskCreatedStreamEvent } from './task-created.stream-event';

@EventsHandler(TaskCreatedStreamEvent)
export class TaskCreatedStreamEventHandler
  implements IEventHandler<TaskCreatedStreamEvent>
{
  private _logger = new Logger(TaskCreatedStreamEventHandler.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: TaskCreatedStreamEvent): Promise<void> {
    this._logger.log({ event });

    const eventPayload: TaskStreamPayloadV1 = {
      ...event.task,
      assigner: event.task.assigner.id,
    };

    await this.amqpConnection.publish<TaskCreatedStreamEventV1>(
      TaskCreatedStreamEventV1.exchange,
      TaskCreatedStreamEventV1.routingKey,
      eventPayloadWrapper(CudTypeEvents.CREATED, 'v1', eventPayload),
    );
  }
}
