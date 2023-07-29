import { INestApplication } from '@nestjs/common';
import { AppConfigCommon } from '../types';
/** Инициализация и настройка параметров Swagger */
export declare const swaggerGenerate: (app: INestApplication, applicationConfig: Pick<AppConfigCommon, 'port' | 'version' | 'developPublicUrl' | 'isProduct' | 'appName'>) => void;
