import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export const TASKS_FANOUT_EXCHANGE: RabbitMQExchangeConfig = {
  name: 'tasks-stream',
  type: 'fanout',
  options: { durable: true },
};
