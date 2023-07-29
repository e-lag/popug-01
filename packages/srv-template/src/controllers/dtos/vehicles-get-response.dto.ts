import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDto } from './pagination-meta.dto';
import { VehicleDto } from './vehicles.dto';

import { PaginationResponse } from './pagination-response.interface';

export class VehiclesGetResponseDto implements PaginationResponse {
  @ApiProperty({ type: () => VehicleDto, isArray: true })
  public data!: VehicleDto[];

  @ApiProperty()
  public meta!: PaginationMetaDto;
}
