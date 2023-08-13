import { ApiProperty } from '@nestjs/swagger';
import { TaskStatuses } from '../../enums/task-statuses.enum';

export class TaskResponseDto {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public assigner: string;
  @ApiProperty()
  public priceAssign: number;
  @ApiProperty()
  public priceFinish: number;
  @ApiProperty()
  public status: TaskStatuses;
  @ApiProperty()
  public createdAt: Date;
  @ApiProperty()
  public updatedAt: Date;
}
