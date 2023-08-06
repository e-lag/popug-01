import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.interfaces';
import { Module } from '@nestjs/common';
import { User, UserCudService } from '@popug/common';
import { USERS_CUD_EXCHANGE } from '@popug/contracts';

import { UsersCudConsumer } from './users-cud.consumer';

export const CUD_ENTITIES = [User];
export const CUD_EXCHANGES: RabbitMQExchangeConfig[] = [USERS_CUD_EXCHANGE];

@Module({
  providers: [
    //users
    UsersCudConsumer,
    UserCudService,
  ],
})
export class CudModule {}
