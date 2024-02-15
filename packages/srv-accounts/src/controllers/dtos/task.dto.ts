import { ApiProperty } from '@nestjs/swagger';
import { User } from '@popug/common';

import { TaskStatuses } from '../../infrastructure/task-statuses.enum';
import { Task } from '../../entities/task.entity';
import { IdentifiedDto } from './Identified.dto';

export class TaskDto extends IdentifiedDto implements Task {
  @ApiProperty()
  public title!: string;

  @ApiProperty()
  public description!: string;

  @ApiProperty()
  public assigner!: User;

  @ApiProperty()
  public price!: string;

  @ApiProperty()
  public status!: TaskStatuses;
}
