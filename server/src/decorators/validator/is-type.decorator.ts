import { applyDecorators } from '@nestjs/common';
import { Type, TypeOptions } from 'class-transformer';
import { ValidateNested, ValidationOptions } from 'class-validator';

export type IsTypeOptions = {
  typeOptions?: TypeOptions;
  validationOptions?: ValidationOptions;
};

export function IsType(type: Function, options?: IsTypeOptions) {
  return applyDecorators(
    Type(() => type, options?.typeOptions),
    ValidateNested(options?.validationOptions),
  );
}
