import { isArray, isNull, isObject, isUndefined } from 'lodash';

export interface FlattenObjectOptions {
  ignoreUndefined?: boolean;
  ignoreNull?: boolean;
  ignoreArray?: boolean;
  interceptor?: (value: any) => boolean;
}

export const flattenToDotObject = (
  source: Object,
  options?: FlattenObjectOptions,
) => {
  const defaultOptions: FlattenObjectOptions = {
    ignoreUndefined: false,
    ignoreNull: false,
    ignoreArray: false,
    interceptor: () => false,
  };

  options = {
    ...defaultOptions,
    ...options,
  };

  const result = {};
  const interceptors = [];

  const undefinedInterceptor = (value: any) => isUndefined(value);
  const nullInterceptor = (value: any) => isNull(value);

  if (options.ignoreUndefined) interceptors.push(undefinedInterceptor);
  if (options.ignoreNull) interceptors.push(nullInterceptor);
  interceptors.push(options.interceptor);

  const resolveObject = (obj: Object, base?: string) => {
    for (let [key, value] of Object.entries(obj)) {
      const keyResolved = base ? `${base}.${key}` : key;

      if (isObject(value)) {
        if (isArray(value) && options.ignoreArray) continue;

        resolveObject(value, keyResolved);
        continue;
      }

      const interceptorCheck = interceptors
        .map((filter) => filter(value))
        .some((value) => value === true);

      if (!interceptorCheck) result[keyResolved] = value;
    }
  };

  resolveObject(source);
  return result;
};
