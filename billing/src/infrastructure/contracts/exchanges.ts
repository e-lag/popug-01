import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';
import { TASKS_EXCHANGE } from './tasks-events';
import { TASKS_FANOUT_EXCHANGE } from './tasks-stream-events';
import { USERS_FANOUT_EXCHANGE } from './users-stream-events';

export const EXCHANGES: RabbitMQExchangeConfig[] = [
  USERS_FANOUT_EXCHANGE,
  TASKS_FANOUT_EXCHANGE,
  TASKS_EXCHANGE,
];
