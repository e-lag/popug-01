import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.interfaces';

import { CUD_EXCHANGES } from '../consumes/cud/cud.module';

export const TASK_EXCHANGES: RabbitMQExchangeConfig[] = [...CUD_EXCHANGES];
