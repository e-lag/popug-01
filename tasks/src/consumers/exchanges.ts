import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';
import { TASK_EXCHANGE, USER_EXCHANGE } from 'event-contracts/dist';

export const EXCHANGES: RabbitMQExchangeConfig[] = [
  USER_EXCHANGE,
  TASK_EXCHANGE,
];
