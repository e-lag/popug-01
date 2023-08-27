import { FlushMode } from '@mikro-orm/core';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';
import { ConfigService } from '@nestjs/config';
import { REPOSITORY_ENTITIES } from './src/enitities/repository.entities';

const configService = new ConfigService();

const MikroOrmConfig: MikroOrmModuleSyncOptions = {
  clientUrl: configService.get('DATABASE_URL'),
  entities: [...REPOSITORY_ENTITIES],
  type: 'postgresql',
  migrations: {
    disableForeignKeys: false,
    pathTs: './migrations',
  },
  flushMode: FlushMode.COMMIT,
};
export default MikroOrmConfig;
