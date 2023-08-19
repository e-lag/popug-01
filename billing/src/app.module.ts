import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { APPLICATION_SERVICES } from './application-service/application-services.const';
import { TaskEventsConsumer } from './consumers/task-events.consumer';
import { AssignerController } from './controlles/assigner.controller';
import { REPOSITORY_ENTITIES } from './enitities/repository.entities';
import { AuthModule } from './infrastructure/auth/auth.module';
import { EXCHANGES } from './infrastructure/contracts/exchanges';
import { UtilsMikroOrmModule } from './infrastructure/mikro-orm.module';
import { StreamingModule } from './infrastructure/streaming/streaming.module';

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
      connectionInitOptions: { wait: true, timeout: 10000 },
      prefetchCount: 10,
    }),
    AuthModule,
    CqrsModule,
    UtilsMikroOrmModule.forRoot(REPOSITORY_ENTITIES, 'DATABASE_URL'),
    StreamingModule,
  ],
  controllers: [AssignerController],
  providers: [...APPLICATION_SERVICES, TaskEventsConsumer],
})
export class AppModule {}
