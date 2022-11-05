import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';
import { QUERY_METADATA } from './api-query-property.decorator';

export interface QueryClassConstructor<T = any> {
  new (...args: any[]): T;
}

export const ApiQueries = (
  queryClass: QueryClassConstructor,
): MethodDecorator => {
  const queryMetadataMap = Reflect.getMetadata(
    QUERY_METADATA,
    queryClass.prototype,
  ) as Map<string, ApiQueryOptions>;

  return applyDecorators(
    ...Array.from(queryMetadataMap, ([_, value]) => ApiQuery(value)),
  );
};
