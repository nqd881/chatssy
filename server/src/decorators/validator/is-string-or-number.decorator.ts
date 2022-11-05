import {
  isNumber,
  isString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsStringOrNumber(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStringOrNumberConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsStringOrNumber' })
export class IsStringOrNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    return isString(value) || isNumber(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a string or number`;
  }
}
