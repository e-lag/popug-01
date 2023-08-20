import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';
import { USER_EXCHANGE } from 'event-contracts/dist';

export const EXCHANGES: RabbitMQExchangeConfig[] = [USER_EXCHANGE];
