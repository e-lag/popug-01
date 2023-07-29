import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UtilsMikroOrmModule } from '@popug/utils-micro-orm';

import {
  USER_COMMAND_HANDLERS,
  USER_QUERY_HANDLERS,
  UserFacade,
} from './application-service';
import { UserController } from './controlles/user.controller';
import { UserLoginController } from './controlles/user-login.controller';
import { REPOSITORY_ENTITIES } from './entities/repository.entities';
import { AuthService } from './infrastructure/auth/auth.service';
import { JWT_CONFIG_FACTORY } from './infrastructure/auth/jwt-config.factory';
import { MobileJwtStrategy } from './infrastructure/auth/mobile-jwt.strategy';
import { UserRepositoryAdapter } from './infrastructure/user.repository-adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: '.env',
    }),
    CqrsModule,
    PassportModule,
    JwtModule.registerAsync(JWT_CONFIG_FACTORY),
    UtilsMikroOrmModule.forRoot(REPOSITORY_ENTITIES, 'SRV_USER_DATABASE_URL'),
  ],
  controllers: [UserController, UserLoginController],
  providers: [
    UserRepositoryAdapter,
    MobileJwtStrategy,
    AuthService,
    UserFacade,
    ...USER_COMMAND_HANDLERS,
    ...USER_QUERY_HANDLERS,
    Logger,
  ],
})
export class AppModule {}
