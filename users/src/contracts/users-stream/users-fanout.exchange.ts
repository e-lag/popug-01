import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export const USERS_FANOUT_EXCHANGE: RabbitMQExchangeConfig = {
  name: 'users-stream',
  type: 'fanout',
  options: { durable: true },
};
