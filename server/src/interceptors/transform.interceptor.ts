import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ChatssyResBody } from 'src/types';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ChatssyResBody<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ChatssyResBody<T>> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
