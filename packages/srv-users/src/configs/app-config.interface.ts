import { AppConfigCommon } from '@popug/utils-common';

/**
 * Интерфейс настроек приложения
 */
export interface AppConfigEmail {
  active: boolean;
  notificationAddress: string;
}
export interface IAppConfig extends AppConfigCommon {
  jwtSecretOrPrivateKey: string;
  emails: AppConfigEmail;
}
