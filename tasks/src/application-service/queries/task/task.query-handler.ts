import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Task } from '../../../enitities/task.entity';
import { TaskQuery } from './task.query';

@QueryHandler(TaskQuery)
export class TaskQueryHandler implements IQueryHandler<TaskQuery> {
  constructor(private readonly em: EntityManager) {}

  public async execute(event: TaskQuery): Promise<Task> {
    return this.em.findOneOrFail(Task, { id: event.id });
  }
}
