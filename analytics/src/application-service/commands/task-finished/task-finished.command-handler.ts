import { EntityManager } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskStatisticsEntity } from '../../../enitities/task-statistics.entity';
import { UuidGenerator } from '../../../infrastructure/uuid.generator';
import { TaskFinishedCommand } from './task-finished.command';

@CommandHandler(TaskFinishedCommand)
export class TaskFinishedCommandHandler
  implements ICommandHandler<TaskFinishedCommand>
{
  private _logger = new Logger(TaskFinishedCommandHandler.name);

  constructor(private readonly em: EntityManager) {}

  public async execute(command: TaskFinishedCommand): Promise<void> {
    this._logger.log(command.task.id);
    const em = this.em.fork();

    const assignedTask = em.create(TaskStatisticsEntity, {
      id: UuidGenerator.generate(),
      assigner: command.task.assigner,
      task: command.task.id,
      priceAssign: command.task.priceAssign,
      priceFinish: command.task.priceFinish,
      action: 'task-finished',
      status: command.task.status,
      createdAt: new Date(),
    });
    await em.persistAndFlush(assignedTask);
  }
}
