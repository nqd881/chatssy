import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type, TypeOptions } from 'class-transformer';
import { ValidateNested, ValidationOptions } from 'class-validator';

export type ApiNestedValidateOptions = {
  typeOptions?: TypeOptions;
  validationOptions?: ValidationOptions;
  apiPropertyOptions?: ApiPropertyOptions;
};

export const ApiNestedValidate = (
  type: Function,
  options?: ApiNestedValidateOptions,
) => {
  return applyDecorators(
    Type(() => type, options?.typeOptions),
    ValidateNested(options?.validationOptions),
    ApiProperty(options?.apiPropertyOptions),
  );
};
