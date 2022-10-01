import { Transform } from 'class-transformer';

export enum SwaggerQueryParamStyle {
  CSV = 'form',
  SPACE = 'spaceDelimited',
  PIPE = 'pipeDelimited',
}

export const SwaggerStyleSeparators: Record<SwaggerQueryParamStyle, string> = {
  [SwaggerQueryParamStyle.CSV]: ',',
  [SwaggerQueryParamStyle.SPACE]: ' ',
  [SwaggerQueryParamStyle.PIPE]: '|',
};

export type MapperFn<T = any> = (
  value: string,
  index?: number,
  array?: T[],
) => T;

export type QueryArrayTransformOptions = {
  style?: SwaggerQueryParamStyle;
  mapperFn?: MapperFn;
};

export const QueryArrayTransform = (options?: QueryArrayTransformOptions) => {
  const defaultOptions: QueryArrayTransformOptions = {
    style: SwaggerQueryParamStyle.CSV,
    mapperFn: (_) => _.trim(),
  };

  options = {
    ...defaultOptions,
    ...options,
  };

  return Transform(({ value }) =>
    (value as string)
      .split(SwaggerStyleSeparators[options.style])
      .filter((_) => _ !== '')
      .map(options.mapperFn),
  );
};
