import {
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export interface DiscriminatedType {
  keyValue: string;
  value: ClassConstructor<any>;
}

export interface DiscriminatedTypeMap {
  [key: string]: ClassConstructor<any>;
}

export interface PipeDiscriminatorOptions {
  discriminatorKey: string;
  types: DiscriminatedType[] | DiscriminatedTypeMap;
}

@Injectable()
export class PipeDiscriminator implements PipeTransform {
  constructor(private options: PipeDiscriminatorOptions) {}

  async transform(value: any) {
    const { discriminatorKey, types } = this.options;
    let discriminatedTypes: DiscriminatedType[];

    if (types instanceof Array) discriminatedTypes = types;
    else {
      let typeMap = types;
      discriminatedTypes = Object.entries(typeMap).map(([key, value]) => ({
        keyValue: key,
        value,
      }));
    }

    const type = discriminatedTypes.find(
      (type) => type.keyValue === value[discriminatorKey],
    );

    if (!type) throw new BadRequestException();

    const transformed = plainToClass(type.value, value);
    const validation = await validate(transformed);

    if (validation.length) {
      const validationPipe = new ValidationPipe();
      const exceptionFactory = validationPipe.createExceptionFactory();
      throw exceptionFactory(validation);
    }

    return transformed;
  }
}
