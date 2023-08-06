import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.interfaces';
import { USERS_CUD_EXCHANGE } from '@popug/contracts';

export const USERS_EXCHANGES: RabbitMQExchangeConfig[] = [USERS_CUD_EXCHANGE];
