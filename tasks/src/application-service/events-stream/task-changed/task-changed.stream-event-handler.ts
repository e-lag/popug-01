import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CudTypeEvents } from '../../../infrastructure/contracts/cud-type-events.enum';
import {
  TaskChangedStreamEventDto,
  TASKS_FANOUT_EXCHANGE,
} from '../../../infrastructure/contracts/tasks-stream-events';
import { TaskChangedStreamEvent } from './task-changed.stream-event';

@EventsHandler(TaskChangedStreamEvent)
export class TaskChangedStreamEventHandler
  implements IEventHandler<TaskChangedStreamEvent>
{
  private _logger = new Logger(TaskChangedStreamEventHandler.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: TaskChangedStreamEvent): Promise<void> {
    this._logger.log({ event });
    const { task } = event;
    //| UserUpdateCudEventDto
    const taskEvent: TaskChangedStreamEventDto = {
      id: task.id,
      operation: CudTypeEvents.UPDATE,
      data: { ...task, assigner: task.assigner.id },
    };
    await this.amqpConnection.publish(
      TASKS_FANOUT_EXCHANGE.name,
      '',
      taskEvent,
    );
  }
}
