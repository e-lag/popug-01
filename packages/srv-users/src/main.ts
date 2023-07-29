import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  LOGGER_CONFIG,
  LongRequestInterceptor,
  requestIdMiddleware,
  swaggerGenerate,
  TransformInterceptor,
  WrapResponseInterceptor,
} from '@popug/utils-common';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';

import { AppConfig, environment } from './configs/application.config';

async function bootstrap(): Promise<void> {
  // dotenv.config();
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*' },
    logger: WinstonModule.createLogger(
      LOGGER_CONFIG('users_srv', 'SRV_USER_LOG_DIR', 'SRV_USER_LOGGER_DEBUG'),
    ),
  });
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);

  // get configs
  environment.config = new AppConfig(configService);

  // logger.debug({ info: 'applicationConfig', applicationConfig });
  app.use(helmet(), requestIdMiddleware);

  // set middlewares
  // app.use(requestIdMiddleware);

  // global interceptors
  app.useGlobalInterceptors(
    new LongRequestInterceptor(),
    // new RequestLogInterceptor(app.get(Logger)),
    new TransformInterceptor(),
    new WrapResponseInterceptor(),
  );

  // global validators
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // swagger
  swaggerGenerate(app, {
    appName: environment.config.appName,
    port: environment.config.port,
    version: environment.config.version,
    developPublicUrl: environment.config.developPublicUrl,
    isProduct: environment.config.isProduct,
  });
  // listen
  await app.listen(environment.config.port);
  logger.log(
    `Application version ${environment.config.version} start on http://localhost:${environment.config.port}/`,
  );
}

bootstrap();
