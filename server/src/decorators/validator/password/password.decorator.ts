import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { checkPassword, ConditionName } from './check-password';
import { CheckPasswordOptions, CheckPasswordResult } from './type';
import _ from 'lodash';

export type PasswordOptionsBase<T extends string> = {
  conditions: Partial<Record<T, number>>;
  optionalMin?: number;
};

export type PasswordOptionsWithRequired<T extends string> =
  PasswordOptionsBase<T> & {
    required?: T[];
  };

export type PasswordOptionsWithOptional<T extends string> =
  PasswordOptionsBase<T> & {
    optional?: T[];
  };

export type PasswordOptions<T extends string> =
  | PasswordOptionsWithRequired<T>
  | PasswordOptionsWithOptional<T>;

const convertOptions = <T extends string>(
  options: PasswordOptions<T>,
): CheckPasswordOptions<T> => {
  const { conditions, optionalMin } = options;

  const requiredConditions = options?.['required']
    ? _.pick(conditions, options?.['required'] ?? [])
    : options?.['optional']
    ? _.omit(conditions, options?.['optional'] ?? [])
    : [];

  const checkPasswordOptions: CheckPasswordOptions<T> = {
    conditions: {},
    optionalMin,
  };

  for (let [name, expected] of Object.entries(conditions)) {
    checkPasswordOptions.conditions[name] = {
      expected,
      required: Boolean(requiredConditions?.[name]),
    };
  }

  return checkPasswordOptions;
};

export const defaultOptions: PasswordOptions<ConditionName> = {
  conditions: {
    min: 8,
    max: 100,
    uppercase: 1,
    lowercase: 1,
    numeric: 1,
    symbol: 1,
  },
  required: ['max', 'min'],
  optionalMin: 3,
};

export const Password = (
  options: PasswordOptions<ConditionName> = defaultOptions,
  validationOptions?: ValidationOptions,
) => {
  const checkPasswordOptions = convertOptions(options);

  return (target: Object, propertyName: string) => {
    registerDecorator({
      target: target.constructor,
      propertyName,
      options: validationOptions,
      constraints: [checkPasswordOptions],
      validator: PasswordConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'Password' })
export class PasswordConstraint implements ValidatorConstraintInterface {
  private info: CheckPasswordResult['info'];

  validate(value: any, args: ValidationArguments) {
    const [checkPasswordOptions] = args.constraints;
    const { passed, info } = checkPassword(value, checkPasswordOptions);

    this.info = info;

    return passed;
  }

  defaultMessage(args: ValidationArguments) {
    return this.buildMessage();
  }

  private buildMessage(): string {
    const errors = _.flatten(
      Object.values(this.info).map((result) => result.errorMap),
    );

    return errors.join(`\n`);
  }
}
