import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Формирует WARNING в логах при запросах длиннее 1500 мс
 */
@Injectable()
export class LongRequestInterceptor implements NestInterceptor {
  /** логгер */
  logger = new Logger(LongRequestInterceptor.name);

  /**
   * Обработчик
   * @param context  ExecutionContext
   * @param next CallHandler
   */
  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const maxTimeForNormalResponse = 1500;
    const shouldSkip = isRabbitContext(context);

    if (shouldSkip) {
      return next.handle();
    }

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const requestTime = Date.now() - now;

        if (requestTime > maxTimeForNormalResponse) {
          const request = context.switchToHttp().getRequest();
          this.logger.warn(`HTTP:${request.method} ${request.route.path} took ${requestTime}ms`);
        }
      }),
    );
  }
}
