import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

const MAX_PAGE_SIZE = 100;

export class VehiclesGetQueryDto {
  @ApiProperty()
  @Max(MAX_PAGE_SIZE)
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  public limit!: number;

  @ApiProperty()
  @Min(0)
  @IsNumber()
  @Type(() => Number)
  public offset!: number;
}
