import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Task } from '../../../enitities/task.entity';
import { TasksQuery } from './tasks.query';

@QueryHandler(TasksQuery)
export class TasksQueryHandler implements IQueryHandler<TasksQuery> {
  constructor(private readonly em: EntityManager) {}

  public async execute(event: TasksQuery): Promise<[Task[], number]> {
    const { limit, offset, ...query } = event.query;
    return this.em.findAndCount(Task, query, {
      limit,
      offset,
    });
  }
}
