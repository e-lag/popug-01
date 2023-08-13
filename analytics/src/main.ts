import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { AppModule } from './app.module';
import { swaggerGenerate } from './infrastructure/swagger';

async function bootstrap() {
  dotenv.config();
  const PORT = process.env['HTTP_PORT'] || '3706';
  const app = await NestFactory.create(AppModule);
  swaggerGenerate(app, {
    appName: 'analytics',
    port: PORT,
    version: '1',
    developPublicUrl: undefined,
    isProduct: false,
  });

  await app.listen(PORT);
  Logger.log(`Analytics start on http://localhost:${PORT}/`, 'APP');
}
bootstrap();
