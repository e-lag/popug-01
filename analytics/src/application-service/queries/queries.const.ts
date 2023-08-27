import { Provider } from '@nestjs/common';
import { BalanceQueryHandler } from './balance/balance.query-handler';

export const QUERIES: Provider[] = [BalanceQueryHandler];
