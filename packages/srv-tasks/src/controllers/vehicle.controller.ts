import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

import { VehicleService } from '../domain/vehicle.service';
import { VehiclesGetQueryDto, VehiclesGetResponseDto } from './dtos';

@ApiTags('vehicles')
@ApiBearerAuth()
@UseGuards(AuthGuard('mobile-jwt'))
@Controller()
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOkResponse({ type: VehiclesGetResponseDto })
  @Get()
  public async vehicles(
    @Query() query: VehiclesGetQueryDto,
  ): Promise<VehiclesGetResponseDto> {
    const { limit, offset } = query;
    const result = await this.vehicleService.vehiclesGet(limit, offset);
    return {
      data: result[0],
      meta: { total: result[1], limit, offset },
    };
  }
}
