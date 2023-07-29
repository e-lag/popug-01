import { ApiProperty } from '@nestjs/swagger';

import { PaginationMeta } from './pagination-response.interface';

export class PaginationMetaDto implements PaginationMeta {
  @ApiProperty()
  public limit!: number;

  @ApiProperty()
  public offset!: number;

  @ApiProperty()
  public total!: number;
  // @ApiProperty()
  // public success!: true;
}
