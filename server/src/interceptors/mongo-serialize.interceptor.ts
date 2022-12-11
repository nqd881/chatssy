import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  ConvertObjectIdSerializer,
  ReplaceUnderscoreIdSerializer,
  SerializerConstructor,
} from '@utils/serialize';
import { Document } from 'mongoose';
import { map, Observable } from 'rxjs';

@Injectable()
export class MongoSerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const serializerConstructors: SerializerConstructor[] = [
      ReplaceUnderscoreIdSerializer,
      ConvertObjectIdSerializer,
    ];

    const serializers = serializerConstructors.map(
      (serializerConstructors) => new serializerConstructors(),
    );

    return next
      .handle()
      .pipe(
        map((value) =>
          serializers.reduce(
            (result, serializer) => serializer.serialize(result),
            value instanceof Document
              ? value.toObject()
              : Object.assign({}, value),
          ),
        ),
      );
  }
}
