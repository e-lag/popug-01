import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';
import { ConfigService } from '@nestjs/config';

import { REPOSITORY_ENTITIES } from './src/entities/repository.entities';

const configService = new ConfigService();

const MikroOrmConfig: MikroOrmModuleSyncOptions = {
  clientUrl: configService.get('SRV_USER_DATABASE_URL'),
  entities: [...REPOSITORY_ENTITIES],
  type: 'postgresql',
  migrations: { disableForeignKeys: false },
};
export default MikroOrmConfig;
