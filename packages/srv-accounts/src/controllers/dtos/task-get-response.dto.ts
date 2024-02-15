import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDto } from './pagination-meta.dto';
import { TaskDto } from './task.dto';

import { PaginationResponse } from './pagination-response.interface';

export class TaskGetResponseDto implements PaginationResponse {
  @ApiProperty({ type: () => TaskDto, isArray: true })
  public data!: TaskDto[];

  @ApiProperty()
  public meta!: PaginationMetaDto;
}
