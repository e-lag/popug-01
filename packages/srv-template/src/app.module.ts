import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthPublicModule, UtilsMikroOrmModule } from '@popug/common';

import { VehicleController } from './controllers/vehicle.controller';
import { VehicleService } from './domain/vehicle.service';
import { REPOSITORY_ENTITIES } from './models/repository.entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: '.env',
    }),
    AuthPublicModule.forRoot('SRV_VEHICLES_JWT_PUBLIC_KEY'),
    UtilsMikroOrmModule.forRoot(REPOSITORY_ENTITIES, 'SRV_VEHICLES_POSTGRES_CONNECT_URL'),
  ],
  controllers: [VehicleController],
  providers: [Logger, VehicleService],
})
export class AppModule {}
