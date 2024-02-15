import { ConfigService } from '@nestjs/config';
import { AppConfigCommon } from '@popug/common';

import {
  SRV_ACCOUNTS_APP_VERSION,
  SRV_ACCOUNTS_CURRENT_ENV,
  SRV_ACCOUNTS_DEVELOP_PUBLIC_URL,
  SRV_ACCOUNTS_HTTP_JSON_LIMIT,
  SRV_ACCOUNTS_HTTP_PORT,
  SRV_ACCOUNTS_IS_PRODUCT,
  SRV_ACCOUNTS_JWT_PUBLIC_KEY,
} from './defaults.consts';

export const environment: { config?: AppConfig } = {};

/** настройки приложения
 *
 * Репозиторий обращений к process.env
 *
 * @param configService ConfigService
 */
export class AppConfig implements AppConfigCommon {
  public readonly appName = 'srv-accounts';

  public developPublicUrl: string;

  public port: string;

  public jsonLimit: string;

  public version: string;

  public currentEnv: 'development' | 'production';

  public isProduct: boolean;

  public jwtPublicKey: string;

  constructor(private configService: ConfigService) {
    this.version = configService.get<string>('SRV_ACCOUNTS_APP_VERSION', SRV_ACCOUNTS_APP_VERSION);
    this.jsonLimit = configService.get<string>('SRV_ACCOUNTS_HTTP_JSON_LIMIT', SRV_ACCOUNTS_HTTP_JSON_LIMIT);

    this.currentEnv = configService.get<'development' | 'production'>(
      'SRV_ACCOUNTS_CURRENT_ENV',
      SRV_ACCOUNTS_CURRENT_ENV,
    );
    this.developPublicUrl = configService.get<string>(
      'SRV_ACCOUNTS_DEVELOP_PUBLIC_URL',
      SRV_ACCOUNTS_DEVELOP_PUBLIC_URL,
    );
    this.jwtPublicKey = configService.get<string>('SRV_ACCOUNTS_JWT_PUBLIC_KEY', SRV_ACCOUNTS_JWT_PUBLIC_KEY);

    this.port = configService.get<string>('SRV_ACCOUNTS_HTTP_PORT', SRV_ACCOUNTS_HTTP_PORT);
    this.isProduct = configService.get<string>('SRV_ACCOUNTS_IS_PRODUCT', SRV_ACCOUNTS_IS_PRODUCT) === 'true';
  }
}
