import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { PassportModule } from '@nestjs/passport';

import { JWT_CONFIG, JWT_CONFIGURATION } from './jwt-configuraiton';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(JWT_CONFIGURATION)],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return configService.get<JwtModuleOptions>(JWT_CONFIG, {});
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthModule {}
