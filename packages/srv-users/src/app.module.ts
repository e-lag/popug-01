import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import {
  USER_COMMAND_HANDLERS,
  USER_QUERY_HANDLERS,
  UserFacade,
} from './application-service';
import { UserController } from './controlles/user.controller';
import { UserLoginController } from './controlles/user-login.controller';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: '.env',
    }),
    CqrsModule,
    AuthModule,
  ],
  controllers: [UserController, UserLoginController],
  providers: [
    UserFacade,
    ...USER_COMMAND_HANDLERS,
    ...USER_QUERY_HANDLERS,
    Logger,
  ],
})
export class AppModule {}
