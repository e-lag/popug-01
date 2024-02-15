import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';

import { REPOSITORY_ENTITIES } from './src/entities';

const configService = new ConfigService();

const MikroOrmConfig: MikroOrmModuleSyncOptions = {
  clientUrl: configService.get<string>('SRV_ACCOUNTS_DATABASE_URL', ''),
  entities: [...REPOSITORY_ENTITIES],
  type: 'postgresql',
  migrations: { disableForeignKeys: false },
};
export default MikroOrmConfig;
