import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JWT_CONFIG_FACTORY } from './jwt-config.factory';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule.registerAsync(JWT_CONFIG_FACTORY)],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
