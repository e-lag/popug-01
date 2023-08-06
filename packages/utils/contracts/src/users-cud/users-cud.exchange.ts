import type { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export const USERS_CUD_EXCHANGE: RabbitMQExchangeConfig = {
  name: 'users-cud',
  type: 'fanout',
  options: { durable: true },
};
