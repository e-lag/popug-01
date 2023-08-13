import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskAssignedCommand } from './task-assigned.command';

@CommandHandler(TaskAssignedCommand)
export class TaskAssignedCommandHandler
  implements ICommandHandler<TaskAssignedCommand>
{
  constructor(private readonly em: EntityManager) {}

  public execute(command: TaskAssignedCommand): Promise<void> {
    return Promise.resolve(undefined);
  }
}
