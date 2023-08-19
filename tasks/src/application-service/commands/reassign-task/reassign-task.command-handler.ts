import { ref } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Task } from '../../../enitities/task.entity';
import { User } from '../../../enitities/user.entity';
import { TaskStatuses } from '../../../enums/task-statuses.enum';
import { UserRoles } from '../../../types/user-roles.enum';
import { TaskChangedStreamEvent } from '../../events-stream/task-changed/task-changed.stream-event';
import { TaskAssignedEvent } from '../../events/task-assigned/task-assigned.event';
import { ReassignTaskCommand } from './reassign-task.command';

@CommandHandler(ReassignTaskCommand)
export class ReassignTaskCommandHandler
  implements ICommandHandler<ReassignTaskCommand>
{
  constructor(
    private readonly em: EntityManager,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(): Promise<any> {
    const openTasks = await this.em.find(Task, { status: TaskStatuses.OPEN });
    const assigners = await this.em.find(User, {
      isActive: true,
      role: UserRoles.CUSTOMER,
    });

    for (const task of openTasks) {
      const rndUserIndex = Math.floor(Math.random() * assigners.length);
      const newAssigner = assigners[rndUserIndex];

      task.assigner = ref(newAssigner);

      await this.em.flush();
      this.eventBus.publish(new TaskChangedStreamEvent(task));
      this.eventBus.publish(new TaskAssignedEvent(task));
    }
  }
}
