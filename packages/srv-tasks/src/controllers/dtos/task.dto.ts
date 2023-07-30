import { ApiProperty } from '@nestjs/swagger';

import { Task } from '../../models/task.entity';
import { IdentifiedDto } from './Identified.dto';

export class TaskDto extends IdentifiedDto implements Task {
  @ApiProperty()
  public title!: string;

  @ApiProperty()
  public description!: string;

  @ApiProperty()
  public assigner!: string;

  @ApiProperty()
  public price!: string;
}
