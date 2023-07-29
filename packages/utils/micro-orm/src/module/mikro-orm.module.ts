import { AnyEntity, EntityClass, EntityClassGroup, EntitySchema } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class UtilsMikroOrmModule {
  public static forRoot(
    entities: (string | EntityClass<AnyEntity> | EntityClassGroup<AnyEntity> | EntitySchema)[],
    env: string,
  ): DynamicModule {
    return {
      imports: [
        MikroOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const clientUrl = configService.get<string>(env);

            if (!clientUrl) {
              throw new Error(`ENV: '${env}' not found. Check '.env' file or server variables.`);
            }

            return {
              cache: {
                enabled: false,
              },
              allowGlobalContext: true,
              clientUrl,
              // debug: config.postgresDebug,
              entities,
              // dbName: config.postgresDb,
              // user: config.postgresUser,
              // password: config.postgresPassword,
              // host: config.postgresHost,
              // port: config.postgresPort,
              type: 'postgresql',
            };
          },
        }),
      ],
      module: UtilsMikroOrmModule,
    };
  }
}
