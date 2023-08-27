import { EntityManager } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Task } from '../../../enitities/task.entity';
import { TaskStatuses } from '../../../enums/task-statuses.enum';
import { TaskUpdatedStreamEvent } from '../../events-stream/task-changed/task-updated.stream-event';
import { TaskFinishedEvent } from '../../events/task-finished/task-finished.event';
import { TaskFinishCommand } from './task-finish.command';

@CommandHandler(TaskFinishCommand)
export class TaskFinishCommandHandler
  implements ICommandHandler<TaskFinishCommand>
{
  private _logger = new Logger(TaskFinishCommandHandler.name);

  constructor(
    private readonly em: EntityManager,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: TaskFinishCommand): Promise<any> {
    this._logger.debug(command);
    const task = await this.em.findOneOrFail(Task, {
      id: command.id,
      assigner: command.user.id,
      status: TaskStatuses.OPEN,
    });

    task.status = TaskStatuses.CLOSED;
    await this.em.flush();
    this.eventBus.publish(new TaskUpdatedStreamEvent(task));
    this.eventBus.publish(new TaskFinishedEvent(task));
  }
}
