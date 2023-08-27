import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  StatisticsQuery,
  StatisticsQueryDto,
} from '../application-service/queries/statistics/statistics.query';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async statisticsGet(@Query() statisticQuery: StatisticsQueryDto) {
    return this.queryBus.execute(new StatisticsQuery(statisticQuery));
  }
}
