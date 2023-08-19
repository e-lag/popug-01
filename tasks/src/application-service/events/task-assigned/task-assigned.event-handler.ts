import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  TASK_ASSIGNED_EVENT_CONFIG,
  TaskAssignedEventPayload,
} from '../../../infrastructure/contracts/tasks-events';
import { TaskAssignedEvent } from './task-assigned.event';

@EventsHandler(TaskAssignedEvent)
export class TaskAssignedEventHandler
  implements IEventHandler<TaskAssignedEvent>
{
  private _logger = new Logger(TaskAssignedEventHandler.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: TaskAssignedEvent): Promise<void> {
    this._logger.log({ event });
    const { task } = event;

    await this.amqpConnection.publish<TaskAssignedEventPayload>(
      TASK_ASSIGNED_EVENT_CONFIG.exchange.name,
      TASK_ASSIGNED_EVENT_CONFIG.routingKey,
      task,
    );
  }
}
