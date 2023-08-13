import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

import { JWT_CONFIG, JWT_CONFIGURATION } from './jwt-configuraiton';

export const JWT_CONFIG_FACTORY = {
  imports: [ConfigModule.forFeature(JWT_CONFIGURATION)],
  useFactory: (configService: ConfigService): JwtModuleOptions => {
    return configService.get<JwtModuleOptions>(JWT_CONFIG, {});
  },
  inject: [ConfigService],
};
