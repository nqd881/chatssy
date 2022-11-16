import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { Types } from 'mongoose';

export const newObjectId = (
  ...args: ConstructorParameters<typeof Types.ObjectId>
) => new Types.ObjectId(...args);

export const docToPlain = (doc: unknown | unknown[]) =>
  JSON.parse(JSON.stringify(doc));

export const docToInstance = (
  cls: ClassConstructor<unknown>,
  doc: unknown | unknown[],
  options?: ClassTransformOptions,
) =>
  plainToInstance(cls, docToPlain(doc), {
    ignoreDecorators: true,
    ...options,
  });
