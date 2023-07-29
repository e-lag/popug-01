import { INestApplication } from '@nestjs/common';
import { SwaggerDocumentOptions } from '@nestjs/swagger/dist/interfaces';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
/** Генератор json файла swagger для экспорта */
export declare const documentSave: (document: OpenAPIObject, optionalUrl: string) => void;
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
export declare function SwaggerStart(app: INestApplication, port: string, title: string, servers: {
    url: string;
    descr: string;
}[], version?: string, docOptions?: SwaggerDocumentOptions): string;
