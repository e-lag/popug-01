import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskStatisticsEntity } from '../../../enitities/task-statistics.entity';
import { StatisticsQuery } from './statistics.query';

@QueryHandler(StatisticsQuery)
export class StatisticsQueryHandler implements IQueryHandler<StatisticsQuery> {
  constructor(private readonly em: EntityManager) {}

  public async execute(
    query: StatisticsQuery,
  ): Promise<[TaskStatisticsEntity[], number]> {
    return this.em.findAndCount(TaskStatisticsEntity, {
      $and: [
        { createdAt: { $gte: query.query.from } },
        { createdAt: { $lte: query.query.to } },
        { assigner: { $eq: query.query.user } },
        { status: { $eq: query.query.status } },
      ],
    });
  }
}
