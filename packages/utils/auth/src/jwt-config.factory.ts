import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

import { JWT_CONFIG, JWT_CONFIGURATION } from './jwt-configuraiton';

export const JWT_CONFIG_FACTORY = (envPublicKey: string): JwtModuleAsyncOptions => ({
  imports: [ConfigModule.forFeature(JWT_CONFIGURATION(envPublicKey))],
  useFactory: (configService: ConfigService): JwtModuleOptions => {
    return configService.get<JwtModuleOptions>(JWT_CONFIG, {});
  },
  inject: [ConfigService],
});
