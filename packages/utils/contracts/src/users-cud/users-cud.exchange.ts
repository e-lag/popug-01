import { RabbitMQExchangeConfig } from '../common/rabbit-mq.interfaces';

export const USERS_CUD_EXCHANGE: RabbitMQExchangeConfig = {
  name: 'users-cud',
  type: 'fanout',
  options: { durable: true },
};