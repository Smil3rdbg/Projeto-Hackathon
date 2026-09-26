import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Envelope<T> {
  success: true;
  data: T;
  timestamp: string;
}

/**
 * Envelopa toda resposta de sucesso em um formato consistente,
 * independente do módulo/controller que a gerou.
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Envelope<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Envelope<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true as const,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
