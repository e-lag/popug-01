import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TASK_COMMANDS } from './application-service/commands/task-commands.const';
import { TASK_STREAM_EVENTS } from './application-service/events-stream/task-stream-events.const';
import { TASK_EVENTS } from './application-service/events/task-events.const';
import { TASK_QUERIES } from './application-service/queries/task-queries.const';
import { TaskAssignerController } from './controllers/task-assigner.controller';
import { TaskManagerController } from './controllers/task-manager.controller';
import { TasksController } from './controllers/tasks.controller';
import { REPOSITORY_ENTITIES } from './enitities/repository.entities';
import { AuthModule } from './infrastructure/auth/auth.module';
import { EXCHANGES } from './infrastructure/contracts/exchanges';
import { UtilsMikroOrmModule } from './infrastructure/mikro-orm.module';
import { StreamingModule } from './infrastructure/streaming/streaming.module';
import { UuidGenerator } from './infrastructure/uuid.generator';

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
    CqrsModule.forRoot(),
    UtilsMikroOrmModule.forRoot(REPOSITORY_ENTITIES, 'DATABASE_URL'),
    StreamingModule,
  ],
  controllers: [TaskAssignerController, TaskManagerController, TasksController],
  providers: [
    ...TASK_QUERIES,
    ...TASK_COMMANDS,
    ...TASK_EVENTS,
    ...TASK_STREAM_EVENTS,
    UuidGenerator,
  ],
})
export class AppModule {}
