import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export const USER_EXCHANGE: RabbitMQExchangeConfig = {
  name: 'user',
  type: 'direct',
  options: { durable: true },
};
