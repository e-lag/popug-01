import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export const TASKS_EXCHANGE: RabbitMQExchangeConfig = {
  name: 'tasks',
  type: 'direct',
  options: { durable: true },
};
