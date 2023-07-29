import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SuccessResponse } from './success-response.wrapper';

import { AppResponse } from './response.interface';

/**
 * Оборачивает ответ в формат ответа из apps-dto
 */
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> | Promise<Observable<unknown>> {
    if (isRabbitContext(context)) {
      return next.handle();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return next.handle().pipe(map((response): AppResponse => new SuccessResponse(response)));
  }
}
