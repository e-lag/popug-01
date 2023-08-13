import { INestApplication } from '@nestjs/common';

import { SwaggerStart } from './swagger';

type AppConfig = {
  port: string;
  version: string;
  developPublicUrl?: string;
  isProduct: boolean;
  appName: string;
};

/** Инициализация и настройка параметров Swagger */
export const swaggerGenerate = (
  app: INestApplication,
  applicationConfig: AppConfig,
): void => {
  const { port, version, developPublicUrl, isProduct, appName } =
    applicationConfig;

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
