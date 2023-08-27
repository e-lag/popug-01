import { User } from '../../../enitities/user.entity';
import { TaskStatuses } from '../../../enums/task-statuses.enum';

export interface StatisticsQueryDto {
  from: Date;
  to: Date;
  user?: User['id'];
  status?: TaskStatuses;
}

export class StatisticsQuery {
  constructor(public readonly query: StatisticsQueryDto) {}
}
