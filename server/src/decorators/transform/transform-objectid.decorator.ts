import { Transform, TransformOptions } from 'class-transformer';

export const TransformObjectId = (options?: TransformOptions) =>
  Transform((params) => {
    if (params.value) {
      return params.obj[params.key].toString();
    }

    return null;
  }, options);
