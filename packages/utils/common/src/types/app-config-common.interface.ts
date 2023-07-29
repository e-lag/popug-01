export interface AppConfigCommon {
  appName: string;
  developPublicUrl: string;
  port: string;
  jsonLimit: string;
  version: string;
  currentEnv: 'development' | 'production';
  isProduct: boolean;
  jwtPublicKey: string;
}
