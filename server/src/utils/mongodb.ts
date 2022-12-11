import { PlainLiteralObject } from '@nestjs/common';
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import _, { isArray, isObject } from 'lodash';
import { Document, Types } from 'mongoose';
import { resolve } from 'path';

export const newObjectId = (
  ...args: ConstructorParameters<typeof Types.ObjectId>
) => new Types.ObjectId(...args);

// export const docToPlain = (doc: Document | Document[]) =>
//   JSON.parse(
//     JSON.stringify(
//       isArray(doc) ? doc.map((item) => item.toObject()) : doc.toObject(),
//     ),
//   );

export const docToPlain = (doc: unknown | unknown[]) =>
  JSON.parse(JSON.stringify(doc));

// export const docToInstance = (
//   cls: ClassConstructor<unknown>,
//   doc: unknown | unknown[],
//   options?: ClassTransformOptions,
// ) =>
//   plainToInstance(cls, docToPlain(doc), {
//     ignoreDecorators: true,
//     ...options,
//   });

export const serializeUnderscoreIdField = (obj: PlainLiteralObject) => {
  let ret = obj instanceof Document ? obj.toObject() : Object.assign({}, obj);

  const resolveValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      return resolveObject(value);
    }

    return value;
  };

  const resolveObject = (source: PlainLiteralObject) => {
    for (let [key, value] of Object.entries(source)) {
      if (key === '_id') {
        source.id = source._id;
        delete source._id;

        continue;
      }

      if (Array.isArray(value)) {
        source[key] = value.map((item) => resolveValue(item));
        continue;
      }

      source[key] = resolveValue(value);
    }

    return source;
  };

  return resolveObject(ret);
};

export const serializeObjectIdValue = (obj: PlainLiteralObject) => {
  let ret = obj instanceof Document ? obj.toObject() : Object.assign({}, obj);

  const resolveValue = (value: any) => {
    if (value instanceof Types.ObjectId) return value.toString();

    if (typeof value === 'object' && value !== null) {
      return resolveObject(value);
    }

    return value;
  };

  const resolveObject = (source: PlainLiteralObject) => {
    for (let [key, value] of Object.entries(source)) {
      if (Array.isArray(value)) {
        source[key] = value.map((item) => resolveValue(item));
        continue;
      }

      source[key] = resolveValue(value);
    }

    return source;
  };

  console.log(resolveObject(ret));

  return resolveObject(ret);
};
//
//
//

// // Ignore loop through the field that have value in options
// export interface SerializerIgnoreOptions {
//   ignore?: (key: string, value: any) => boolean;
// }

// export type SerializerOptions = SerializerIgnoreOptions;

// export interface Serializer<V extends PlainLiteralObject = any, R = any> {
//   serialize(value: V): R;
// }

// export interface SerializerConstructor {
//   new (options?: SerializerOptions): Serializer;
// }

// export interface SerializerContext {
//   obj: PlainLiteralObject;
//   result: PlainLiteralObject;
//   key: string;
//   value: any;
//   options: SerializerOptions;
//   resolve: (obj: PlainLiteralObject) => any;
// }

// export interface SerializerLogic {
//   // prepare?: (value: any) => PlainLiteralObject;
//   resolveField(context: SerializerContext): any;
// }

// export interface SerializerLogicConstructor {
//   new (...args: any[]): SerializerLogic;
// }

// export class SerializerFactory {
//   static build(
//     logicConstructor: SerializerLogicConstructor,
//     defaultSerializerOptions?: SerializerOptions,
//   ): SerializerConstructor {
//     const logic = new logicConstructor();

//     return class ReturnSerializer implements Serializer {
//       private options: SerializerOptions;

//       constructor(options?: SerializerOptions) {
//         this.options = _.merge(defaultSerializerOptions, options);
//       }

//       private isPrimitive(value: any) {
//         return value !== Object(value);
//       }

//       private isFunction(value: any) {
//         return typeof value === 'function';
//       }

//       private cleanSource(source: any) {
//         if (source instanceof Array) {
//           return source.filter((subSource) => !this.isFunction(subSource));
//         }

//         const entries = Object.entries(source);
//       }

//       private isObjectCanResolved(value: any) {
//         if (typeof value !== 'object') return false;

//         // if (typeof value === 'function') return false;

//         // if (value == null) return false;

//         return true;
//       }

//       serialize(
//         source: PlainLiteralObject | PlainLiteralObject[],
//         options?: SerializerOptions,
//       ) {
//         const appliedOptions = _.merge(this.options, options);

//         // Resolve object
//         const resolve = (
//           obj: PlainLiteralObject,
//           options?: SerializerOptions,
//         ) => {
//           if (obj == null) return null;

//           if (obj instanceof Array) return this.serialize(obj, options);

//           // const entries = obj.entries(obj).filter(([key, value]) => {
//           //   return (
//           //     this.isPrimitive(value) ||
//           //     (isObject(value) && this.isObjectCanResolved(value))
//           //   );
//           // });

//           const result = {};

//           // for (let [key, value] of entries) {
//           for (let [key, value] of Object.entries(obj)) {
//             // if ()

//             const context: SerializerContext = {
//               obj,
//               result,
//               key,
//               value,
//               resolve: (value: PlainLiteralObject) => resolve(value, options),
//               // serializer: this,
//               options,
//             };

//             logic.resolveField(context);
//           }

//           return result;
//         };

//         return source instanceof Array
//           ? source.map((sub) => resolve(sub, appliedOptions))
//           : resolve(source, appliedOptions);
//       }

//       // private isIgnore() {}

//       // serialize(source: any, options?: SerializerOptions) {
//       //   const appliedOptions = _.merge(this.options, options);

//       //   if (source instanceof Array) {
//       //     return source
//       //       .filter((subValue) => !this.isFunction(subValue))
//       //       .map((subValue) => this.serialize(subValue, appliedOptions));
//       //   }

//       //   if (this.isPrimitive(source)) return source;

//       //   const entries = Object.entries(source).filter(
//       //     ([_, value]) => !this.isFunction(value),
//       //   );

//       //   if (entries.length == 0) return source;

//       //   const result = {};

//       //   for (let [key, value] of entries) {
//       //     const context: SerializerContext = {
//       //       obj: source,
//       //       result,
//       //       key,
//       //       value,
//       //       serializer: this,
//       //       options: this.options,
//       //     };

//       //     logic.resolveField(context);
//       //   }

//       //   return result;
//       // }
//     };
//   }
// }

// export class ReplaceUnderscoreIdFieldSerializerLogic
//   implements SerializerLogic
// {
//   resolveField({ result, key, value, resolve }: SerializerContext) {
//     if (key === '_id') {
//       result.id = value;
//       return;
//     }

//     result[key] = resolve(value);
//   }
// }

// export class ObjectIdValueSerializerLogic implements SerializerLogic {
//   resolveField({ result, key, value, resolve }: SerializerContext) {
//     if (value instanceof Types.ObjectId) {
//       result[key] = value.toString();
//       return;
//     }

//     result[key] = resolve(value);
//   }
// }

// export const ReplaceUnderscoreIdFieldSerializerConstructor =
//   SerializerFactory.build(ReplaceUnderscoreIdFieldSerializerLogic);

// export const ObjectIdValueSerializerConstructor = SerializerFactory.build(
//   ObjectIdValueSerializerLogic,
// );

// export const testReplaceUnderscoreIdFieldSerializer =
//   new ReplaceUnderscoreIdFieldSerializerConstructor();

// export const testObjectIdValueSerializer =
//   new ObjectIdValueSerializerConstructor();
