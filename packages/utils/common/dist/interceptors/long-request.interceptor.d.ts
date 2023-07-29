import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
/**
 * Формирует WARNING в логах при запросах длиннее 1500 мс
 */
export declare class LongRequestInterceptor implements NestInterceptor {
    /** логгер */
    logger: Logger;
    /**
     * Обработчик
     * @param context  ExecutionContext
     * @param next CallHandler
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
}
