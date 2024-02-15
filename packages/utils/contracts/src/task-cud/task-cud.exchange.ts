import { RabbitMQExchangeConfig } from '../common/rabbit-mq.interfaces';

export const TASK_CUD_EXCHANGE: RabbitMQExchangeConfig = {
  name: 'task-cud',
  type: 'fanout',
  options: { durable: true },
};
