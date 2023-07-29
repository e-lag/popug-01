import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JWT_CONFIG_FACTORY } from './jwt-config.factory';
import { MobileJwtStrategy } from './mobile-jwt.strategy';

@Module({})
export class AuthPublicModule {
  public static forRoot(publicKeyEnv: string): DynamicModule {
    return {
      module: AuthPublicModule,
      imports: [PassportModule, JwtModule.registerAsync(JWT_CONFIG_FACTORY(publicKeyEnv))],
      providers: [MobileJwtStrategy],
      exports: [],
    };
  }
}
