import { INestApplication } from '@nestjs/common';

import { SwaggerStart } from './swagger';

import { AppConfigCommon } from '../types';

/** Инициализация и настройка параметров Swagger */
export const swaggerGenerate = (
  app: INestApplication,
  applicationConfig: Pick<AppConfigCommon, 'port' | 'version' | 'developPublicUrl' | 'isProduct' | 'appName'>,
): void => {
  const { port, version, developPublicUrl, isProduct, appName } = applicationConfig;

  if (!isProduct) {
    SwaggerStart(
      app,
      port,
      appName,
      [
        ...(!developPublicUrl
          ? []
          : [
              {
                url: developPublicUrl,
                descr: 'dev server',
              },
            ]),

        {
          url: `http://localhost:${port}/`,
          descr: 'localhost',
        },
      ],
      version,
    );
  }
};
