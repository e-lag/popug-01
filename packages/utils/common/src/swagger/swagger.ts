import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocumentOptions } from '@nestjs/swagger/dist/interfaces';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import * as fs from 'fs';
import * as path from 'path';

/** URL по которому будет доступен Swagger */
const SWAGGER_URL = 'api-doc';

/** Генератор json файла swagger для экспорта */
export const documentSave = (document: OpenAPIObject, optionalUrl: string): void => {
  const docPath = path.resolve(`assets/swaggerDoc${optionalUrl.replace('/', '_')}.json`);
  try {
    if (!fs.existsSync(docPath)) {
      fs.closeSync(fs.openSync(docPath, 'w'));
    }

    fs.writeFileSync(docPath, JSON.stringify(document, null, '  '));
  } catch (e) {
    Logger.error('error create swagger', e, 'SWAGGER');
  }

  Logger.log(`document save on ${docPath}`, 'SWAGGER');
};

/**
 * Запуск Swagger
 *
 * @param app - приложение Nest
 * @param port - Порт, где запущено приложение
 * @param title - Заголовок приложения
 * @param servers - URL для вызова API
 * @param version - Версия API
 * @param docOptions - Параметры swagger
 * @constructor
 */
export function SwaggerStart(
  app:  INestApplication,
  port: string,
  title: string,
  servers: { url: string; descr: string }[],
  version = '1.0',
  docOptions?: SwaggerDocumentOptions,
): string {
  const documentBuilder = new DocumentBuilder().setTitle(title);
  documentBuilder.setDescription(`
Build time: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
    `);
  servers.map((server) => documentBuilder.addServer(server.url, server.descr));
  documentBuilder.setVersion(version).addBearerAuth();
  const doc = SwaggerModule.createDocument(app, documentBuilder.build(), docOptions);
  // documentSave(doc, optionalUrl);
  Logger.log(`swagger: http://localhost:${port}/${SWAGGER_URL}/`, 'SWAGGER');
  SwaggerModule.setup(SWAGGER_URL, app, doc);
  return SWAGGER_URL;
}
