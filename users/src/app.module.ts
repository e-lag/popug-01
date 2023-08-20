import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  USER_COMMAND_HANDLERS,
  USER_QUERY_HANDLERS,
  UserFacade,
} from './application-service';
import { USER_STREAM_EVENT_HANDLERS } from './application-service/events-streaming/user-stream-event-handlres.const';
import { USER_EVENT_HANDLERS } from './application-service/events/user-event-handlres.const';
import { UserAdminController } from './controlles/user-admin.controller';
import { UserLoginController } from './controlles/user-login.controller';
import { UserController } from './controlles/user.controller';
import { REPOSITORY_ENTITIES } from './enitities/repository.entities';
import { AuthModule } from './infrastructure/auth/auth.module';
import { AuthService } from './infrastructure/auth/auth.service';
import { JWT_CONFIG_FACTORY } from './infrastructure/auth/jwt-config.factory';
import { JwtStrategy } from './infrastructure/auth/jwt.strategy';
import { EXCHANGES } from './infrastructure/exchanges';
import { UtilsMikroOrmModule } from './infrastructure/mikro-orm.module';
import { UserRepositoryAdapter } from './infrastructure/user.repository-adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: '.env',
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: EXCHANGES,
      uri: process.env['AMQP_URI'] ?? '',
      connectionInitOptions: { wait: true },
    }),
    AuthModule,
    CqrsModule,
    PassportModule,
    JwtModule.registerAsync(JWT_CONFIG_FACTORY),
    UtilsMikroOrmModule.forRoot(REPOSITORY_ENTITIES, 'DATABASE_URL'),
  ],
  controllers: [UserController, UserLoginController, UserAdminController],
  providers: [
    UserRepositoryAdapter,
    JwtStrategy,
    AuthService,
    UserFacade,
    ...USER_COMMAND_HANDLERS,
    ...USER_QUERY_HANDLERS,
    ...USER_EVENT_HANDLERS,
    ...USER_STREAM_EVENT_HANDLERS,
  ],
})
export class AppModule {}
