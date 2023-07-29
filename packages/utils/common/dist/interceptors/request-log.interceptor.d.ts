import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
/**
 * Interceptor ля перехвата входящих http запросов.
 */
export declare class RequestLogInterceptor implements NestInterceptor {
    /**
     * Создает interceptor, логирующий запросы к серверу
     * @param configService
     */
    private readonly logger;
    constructor();
    /**
     * Метод для перехвата запроса
     * @param context - контекст исполнения
     * @param next
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
    private logRequest;
    private logResponse;
    private logResponseError;
    /**
     * Расчет времени выполнения
     * @param start - Время начала
     * @static
     * @private
     */
    private calculateDiffTime;
}
