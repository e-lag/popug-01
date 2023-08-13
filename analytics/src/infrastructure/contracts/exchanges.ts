import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';
import { USERS_FANOUT_EXCHANGE } from './users-stream';

export const EXCHANGES: RabbitMQExchangeConfig[] = [USERS_FANOUT_EXCHANGE];
