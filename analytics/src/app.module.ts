import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { APPLICATION_SERVICES } from './application-service/application-services.const';
import { ConsumersModule } from './consumers/consumers.module';
import { StatisticsController } from './controllers/statistics.controller';
import { REPOSITORY_ENTITIES } from './enitities/repository.entities';
import { AuthModule } from './infrastructure/auth/auth.module';
import { EXCHANGES } from './infrastructure/contracts/exchanges';
import { UtilsMikroOrmModule } from './infrastructure/mikro-orm.module';

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
    ConsumersModule,
    CqrsModule,
    UtilsMikroOrmModule.forRoot(REPOSITORY_ENTITIES, 'DATABASE_URL'),
  ],
  controllers: [StatisticsController],
  providers: [...APPLICATION_SERVICES],
})
export class AppModule {}
