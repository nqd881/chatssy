import { newObjectId } from '@utils/mongodb';
import {
  Transform,
  TransformationType,
  TransformOptions,
} from 'class-transformer';

export const TransformObjectId = (options?: TransformOptions) => {
  return Transform((params) => {
    const { obj, key, type } = params;

    if (type === TransformationType.PLAIN_TO_CLASS)
      return newObjectId(obj[key]);

    if (type === TransformationType.CLASS_TO_PLAIN) return obj[key].toString();
  }, options);
};
