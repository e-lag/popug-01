import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CudTypeEvents } from '../../../infrastructure/contracts/cud-type-events.enum';
import {
  TaskCreateStreamEventDto,
  TASKS_FANOUT_EXCHANGE,
} from '../../../infrastructure/contracts/tasks-stream-events';
import { TaskChangedStreamEvent } from '../task-changed/task-changed.stream-event';
import { TaskCreatedStreamEvent } from './task-created.stream-event';

@EventsHandler(TaskCreatedStreamEvent)
export class TaskCreatedStreamEventHandler
  implements IEventHandler<TaskCreatedStreamEvent>
{
  private _logger = new Logger(TaskCreatedStreamEventHandler.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async handle(event: TaskChangedStreamEvent): Promise<void> {
    this._logger.log({ event });
    const { task } = event;
    //| UserUpdateCudEventDto
    const taskEvent: TaskCreateStreamEventDto = {
      id: task.id,
      operation: CudTypeEvents.CREATE,
      data: { ...task, assigner: task.assigner.id },
    };
    await this.amqpConnection.publish(
      TASKS_FANOUT_EXCHANGE.name,
      '',
      taskEvent,
    );
  }
}
