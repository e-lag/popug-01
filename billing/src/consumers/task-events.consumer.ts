import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { TaskAssignedCommand } from '../application-service/commands/task-assigned/task-assigned.command';
import { TaskFinishedCommand } from '../application-service/commands/task-finished/task-finished.command';
import {
  TASK_ASSIGNED_EVENT_CONFIG,
  TASK_FINISHED_EVENT_CONFIG,
  TaskAssignedEventPayload,
  TaskFinishedEventPayload,
} from '../infrastructure/contracts/tasks-events';

@Injectable()
export class TaskEventsConsumer {
  constructor(private commandBus: CommandBus) {}

  @RabbitSubscribe({
    exchange: TASK_ASSIGNED_EVENT_CONFIG.exchange.name,
    routingKey: TASK_ASSIGNED_EVENT_CONFIG.routingKey,
    queue:
      TASK_ASSIGNED_EVENT_CONFIG.exchange.name +
      '_' +
      TASK_ASSIGNED_EVENT_CONFIG.routingKey,
  })
  async taskAssigned(payload: TaskAssignedEventPayload) {
    await this.commandBus.execute(new TaskFinishedCommand(payload));
  }

  @RabbitSubscribe({
    exchange: TASK_FINISHED_EVENT_CONFIG.exchange.name,
    routingKey: TASK_FINISHED_EVENT_CONFIG.routingKey,
    queue:
      TASK_FINISHED_EVENT_CONFIG.exchange.name +
      '_' +
      TASK_FINISHED_EVENT_CONFIG.routingKey,
  })
  async taskFinished(payload: TaskFinishedEventPayload) {
    await this.commandBus.execute(new TaskAssignedCommand(payload));
  }
}
