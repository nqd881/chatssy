import {
  Transform,
  TransformFnParams,
  TransformOptions,
} from 'class-transformer';
import { isFunction } from 'lodash';

export type TransformDateOptions = TransformOptions & {
  dateHandler?: (date: Date, params?: TransformFnParams) => any;
};

export const TransformDate = (
  transformDateOptions: TransformDateOptions = {},
) => {
  const defaultDateHandler = (date) => date;
  const { dateHandler, ...transformOptions } = transformDateOptions;

  return Transform((params) => {
    const { obj, key } = params;
    const date = new Date(obj[key]);

    return isFunction(dateHandler)
      ? dateHandler(date, params)
      : defaultDateHandler(date);
  }, transformOptions);
};
