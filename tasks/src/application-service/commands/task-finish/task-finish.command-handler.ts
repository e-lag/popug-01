import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Task } from '../../../enitities/task.entity';
import { TaskStatuses } from '../../../enums/task-statuses.enum';
import { TaskChangedStreamEvent } from '../../events-stream/task-changed/task-changed.stream-event';
import { TaskFinishedEvent } from '../../events/task-finished/task-finished.event';
import { TaskFinishCommand } from './task-finish.command';

@CommandHandler(TaskFinishCommand)
export class TaskFinishCommandHandler
  implements ICommandHandler<TaskFinishCommand>
{
  constructor(
    private readonly em: EntityManager,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: TaskFinishCommand): Promise<any> {
    const task = await this.em.findOneOrFail(Task, {
      id: command.id,
      assigner: command.user.id,
      status: TaskStatuses.OPEN,
    });

    task.status = TaskStatuses.CLOSED;
    await this.em.flush();
    this.eventBus.publish(new TaskChangedStreamEvent(task));
    this.eventBus.publish(new TaskFinishedEvent(task));
  }
}
