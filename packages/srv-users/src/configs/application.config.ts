import { ConfigService } from '@nestjs/config';

import {
  SRV_USER_APP_VERSION,
  SRV_USER_CURRENT_ENV,
  SRV_USER_DEVELOP_PUBLIC_URL,
  SRV_USER_EMAIL_NOTIFICATIONS,
  SRV_USER_HTTP_JSON_LIMIT,
  SRV_USER_HTTP_PORT,
  SRV_USER_IS_PRODUCT,
  SRV_USER_JWT_PUBLIC_KEY,
  SRV_USER_PRIVATE_KEY,
} from './defaults.consts';

import { AppConfigEmail, IAppConfig } from './app-config.interface';

export const environment: { config?: AppConfig } = {};

/** настройки приложения
 *
 * Репозиторий обращений к process.env
 *
 * @param configService ConfigService
 */
export class AppConfig implements IAppConfig {
  public appName: string;

  public currentEnv: 'development' | 'production';

  public jsonLimit: string;

  public developPublicUrl: string;

  public emails: AppConfigEmail;

  public isProduct: boolean;

  public jwtPublicKey: string;

  public jwtSecretOrPrivateKey: string;

  public port: string;

  public version: string;

  constructor(private configService: ConfigService) {
    this.appName = 'srv-users';

    this.version = configService.get<string>('SRV_USER_APP_VERSION', SRV_USER_APP_VERSION);
    this.jsonLimit = configService.get<string>('SRV_USER_HTTP_JSON_LIMIT', SRV_USER_HTTP_JSON_LIMIT);

    this.currentEnv = configService.get<'development' | 'production'>('SRV_USER_CURRENT_ENV', SRV_USER_CURRENT_ENV);
    this.developPublicUrl = configService.get<string>('SRV_USER_DEVELOP_PUBLIC_URL', SRV_USER_DEVELOP_PUBLIC_URL);
    this.jwtPublicKey = configService.get<string>('SRV_USER_JWT_PUBLIC_KEY', SRV_USER_JWT_PUBLIC_KEY);
    this.jwtSecretOrPrivateKey = configService.get<string>('SRV_USER_JWT_PRIVATE_KEY', SRV_USER_PRIVATE_KEY);
    this.port = configService.get<string>('SRV_USER_HTTP_PORT', SRV_USER_HTTP_PORT);
    this.isProduct = configService.get<string>('SRV_USER_IS_PRODUCT', SRV_USER_IS_PRODUCT) === 'true';

    this.emails = this.emailsConfigGet();
  }

  private emailsConfigGet(): AppConfigEmail {
    return {
      active: this.configService.get<string>('SRV_USER_EMAILS_IS_ACTIVE', '') === 'true',
      notificationAddress: this.configService.get<string>('SRV_USER_EMAIL_NOTIFICATION', SRV_USER_EMAIL_NOTIFICATIONS),
    };
  }
}
