import { ApiQueryOptions } from '@nestjs/swagger';

export const QUERY_METADATA = 'QueryMetadata';

export type ApiQueryPropertyOptions = ApiQueryOptions;

export const ApiQueryProperty = (
  options: ApiQueryPropertyOptions = {},
): PropertyDecorator => {
  const defaultOptions: ApiQueryOptions = {
    style: 'form',
    explode: false,
  };

  options = { ...defaultOptions, ...options };

  return (target: any, propertyKey: string) => {
    const queryMetadata =
      Reflect.getMetadata(QUERY_METADATA, target) ??
      new Map<string, ApiQueryOptions>();

    queryMetadata.set(propertyKey, { ...options, name: propertyKey });

    Reflect.defineMetadata(QUERY_METADATA, queryMetadata, target);
  };
};
