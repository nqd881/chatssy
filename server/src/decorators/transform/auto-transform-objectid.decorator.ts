import { applyDecorators } from '@nestjs/common';
import { newObjectId } from '@utils/mongodb';
import { Transform } from 'class-transformer';
import { isObjectIdOrHexString } from 'mongoose';

export const AutoTransformObjectId = () => {
  return applyDecorators(
    Transform(
      (params) => {
        if (!isObjectIdOrHexString(params.value)) return null;
        return newObjectId(params.value);
      },
      { toClassOnly: true },
    ),
    Transform(
      (params) => {
        return params.value.toString();
      },
      { toPlainOnly: true },
    ),
  );
};
