import { isArray, isObjectLike } from 'lodash';
import { Types } from 'mongoose';

export interface PlainLiteralObject {
  [key: string]: any;
}

export interface Serializer {
  serialize(source: PlainLiteralObject): any;
}

export interface SerializerConstructor {
  new (...args: any[]): Serializer;
}

export class ReplaceUnderscoreIdSerializer implements Serializer {
  serialize(source: PlainLiteralObject) {
    if (isArray(source)) return source.map((sub) => this.serialize(sub));

    if (!isObjectLike(source)) return source;

    const resolveValue = (value: any) => {
      if (isObjectLike(value)) {
        return resolveObject(value);
      }

      return value;
    };

    const resolveObject = (obj: PlainLiteralObject) => {
      for (let [key, value] of Object.entries(obj)) {
        if (key === '_id') {
          obj.id = obj._id;
          delete obj._id;

          continue;
        }

        if (isArray(value)) {
          obj[key] = value.map((item) => resolveValue(item));
          continue;
        }

        obj[key] = resolveValue(value);
      }

      return obj;
    };

    return resolveObject(source);
  }
}

export class ConvertObjectIdSerializer implements Serializer {
  serialize(source: PlainLiteralObject) {
    if (isArray(source)) return source.map((sub) => this.serialize(sub));

    if (!isObjectLike(source)) return source;

    const resolveValue = (value: any) => {
      if (value instanceof Types.ObjectId) return value.toString();

      if (isObjectLike(value)) {
        return resolveObject(value);
      }

      return value;
    };

    const resolveObject = (obj: PlainLiteralObject) => {
      for (let [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
          obj[key] = value.map((item) => resolveValue(item));
          continue;
        }

        obj[key] = resolveValue(value);
      }

      return obj;
    };

    return resolveObject(source);
  }
}
