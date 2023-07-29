import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Интерсептор для преобразования в объект
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  // @ts-ignore
  public intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    return next.handle().pipe(map((data) => instanceToPlain(data)));
  }
}
