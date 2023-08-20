import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export const TASK_EXCHANGE: RabbitMQExchangeConfig = {
  name: 'tasks',
  type: 'direct',
  options: { durable: true },
};
