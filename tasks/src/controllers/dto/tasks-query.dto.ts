import { ApiProperty } from '@nestjs/swagger';
import { TaskStatuses } from '../../enums/task-statuses.enum';

export class TasksQueryDto {
  @ApiProperty({ required: false })
  assigner?: string | undefined;

  @ApiProperty({ required: false })
  taskStatus?: TaskStatuses | undefined;

  @ApiProperty({ required: false })
  limit?: number | undefined;

  @ApiProperty({ required: false })
  offset?: number | undefined;
}
