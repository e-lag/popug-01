import { ApiProperty } from '@nestjs/swagger';

import { Vehicle } from '../../models/vehicle.entity';

export class VehicleDto implements Vehicle {
  @ApiProperty()
  public vin!: string;

  @ApiProperty()
  public licensePlate!: string;

  @ApiProperty()
  public brand!: string;

  @ApiProperty()
  public model!: string;

  @ApiProperty()
  public makeModelYear!: string;

  @ApiProperty()
  public dealerName!: string;

  @ApiProperty()
  public dealerAddress!: string;
}
