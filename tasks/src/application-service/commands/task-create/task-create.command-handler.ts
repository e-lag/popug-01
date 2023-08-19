import { ref } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Task } from '../../../enitities/task.entity';
import { User } from '../../../enitities/user.entity';
import { TaskStatuses } from '../../../enums/task-statuses.enum';
import { UuidGenerator } from '../../../infrastructure/uuid.generator';
import { UserRoles } from '../../../types/user-roles.enum';
import { TaskCreatedStreamEvent } from '../../events-stream/task-created/task-created.stream-event';
import { TaskAssignedEvent } from '../../events/task-assigned/task-assigned.event';
import { TaskCreateCommand } from './task-create.command';

@CommandHandler(TaskCreateCommand)
export class TaskCreateCommandHandler
  implements ICommandHandler<TaskCreateCommand>
{
  private readonly _logger = new Logger(TaskCreateCommandHandler.name);

  constructor(
    private readonly em: EntityManager,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: TaskCreateCommand): Promise<Task> {
    const assigners = await this.em.find(User, {
      isActive: true,
      role: UserRoles.CUSTOMER,
    });
    const rndUserIndex = Math.floor(Math.random() * assigners.length);
    const newAssigner = assigners[rndUserIndex];
    this._logger.debug({ newAssigner, rndUserIndex });
    const task = this.em.create(Task, {
      ...command.task,
      id: UuidGenerator.generate(),
      createdAt: new Date(),
      updatedAt: new Date(),
      assigner: ref(newAssigner),
      priceAssign: this.getTaskAssignPrice(),
      priceFinish: this.getTaskFinishPrice(),
      status: TaskStatuses.OPEN,
    });
    await this.em.persistAndFlush(task);
    this.eventBus.publish(new TaskCreatedStreamEvent(task));
    this.eventBus.publish(new TaskAssignedEvent(task));

    return task;
  }

  private getTaskAssignPrice(): number {
    return Math.round(Math.random() * 10) + 10;
  }

  private getTaskFinishPrice(): number {
    return Math.round(Math.random() * 20) + 20;
  }
}
