import { ConfigService } from '@nestjs/config';
import { AppConfigCommon } from '@popug/utils-common';

import {
  SRV_TASKS_APP_VERSION,
  SRV_TASKS_CURRENT_ENV,
  SRV_TASKS_DEVELOP_PUBLIC_URL,
  SRV_TASKS_HTTP_JSON_LIMIT,
  SRV_TASKS_HTTP_PORT,
  SRV_TASKS_IS_PRODUCT,
  SRV_TASKS_JWT_PUBLIC_KEY,
} from './defaults.consts';

export const environment: { config?: AppConfig } = {};

/** настройки приложения
 *
 * Репозиторий обращений к process.env
 *
 * @param configService ConfigService
 */
export class AppConfig implements AppConfigCommon {
  public readonly appName = 'srv-tasks';

  public developPublicUrl: string;

  public port: string;

  public jsonLimit: string;

  public version: string;

  public currentEnv: 'development' | 'production';

  public isProduct: boolean;

  public jwtPublicKey: string;

  constructor(private configService: ConfigService) {
    this.version = configService.get<string>(
      'SRV_TASKS_APP_VERSION',
      SRV_TASKS_APP_VERSION,
    );
    this.jsonLimit = configService.get<string>(
      'SRV_TASKS_HTTP_JSON_LIMIT',
      SRV_TASKS_HTTP_JSON_LIMIT,
    );

    this.currentEnv = configService.get<'development' | 'production'>(
      'SRV_TASKS_CURRENT_ENV',
      SRV_TASKS_CURRENT_ENV,
    );
    this.developPublicUrl = configService.get<string>(
      'SRV_TASKS_DEVELOP_PUBLIC_URL',
      SRV_TASKS_DEVELOP_PUBLIC_URL,
    );
    this.jwtPublicKey = configService.get<string>(
      'SRV_TASKS_JWT_PUBLIC_KEY',
      SRV_TASKS_JWT_PUBLIC_KEY,
    );

    this.port = configService.get<string>(
      'SRV_TASKS_HTTP_PORT',
      SRV_TASKS_HTTP_PORT,
    );
    this.isProduct =
      configService.get<string>(
        'SRV_TASKS_IS_PRODUCT',
        SRV_TASKS_IS_PRODUCT,
      ) === 'true';
  }
}
