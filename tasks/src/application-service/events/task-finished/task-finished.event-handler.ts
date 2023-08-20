import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  TASK_FINISHED_EVENT_CONFIG,
  TaskFinishedEventPayload,
} from '../../../infrastructure/contracts/tasks-events';
import { TaskFinishedEvent } from './task-finished.event';

@EventsHandler(TaskFinishedEvent)
export class TaskFinishedEventHandler
  implements IEventHandler<TaskFinishedEvent>
{
  private _logger = new Logger(TaskFinishedEvent.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: TaskFinishedEvent): Promise<void> {
    this._logger.log({ event });
    const { task } = event;

    await this.amqpConnection.publish<TaskFinishedEventPayload>(
      TASK_FINISHED_EVENT_CONFIG.exchange.name,
      TASK_FINISHED_EVENT_CONFIG.routingKey,
      task,
    );
  }
}
