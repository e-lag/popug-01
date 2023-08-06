import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthPublicModule, UtilsMikroOrmModule } from '@popug/common';

import { CudModule } from './consumes/cud/cud.module';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './domain/task.service';
import { TASK_EXCHANGES } from './events/task-exchanges';
import { REPOSITORY_ENTITIES } from './models/repository.entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: '.env',
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: TASK_EXCHANGES,
      uri: process.env.SRV_TASKS_AMQP_URI ?? '',
      connectionInitOptions: { wait: false },
    }),
    AuthPublicModule.forRoot('SRV_TASKS_JWT_PUBLIC_KEY'),
    UtilsMikroOrmModule.forRoot(REPOSITORY_ENTITIES, 'SRV_TASKS_DATABASE_URL'),
    CudModule,
  ],
  controllers: [TaskController],
  providers: [Logger, TaskService],
})
export class AppModule {}
