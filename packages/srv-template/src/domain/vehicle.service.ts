import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { Vehicle } from '../models/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(private em: EntityManager) {}

  public async vehiclesGet(
    limit: number,
    offset: number,
  ): Promise<[Vehicle[], number]> {
    return this.em.findAndCount(Vehicle, {}, { limit, offset });
  }
}
