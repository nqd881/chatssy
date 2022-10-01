import { Checker, CheckerConstructor } from './checker';

export type ConditionOptions = {
  expected: number;
  required?: boolean;
};

export type CheckerConstructorMap<T extends string = string> = Record<
  T,
  CheckerConstructor
>;

export type CheckerMap<T extends string = string> = Map<T, Checker>;

export type ConditionMap<T extends string = string> = Record<
  T,
  ConditionOptions
>;

export type CheckPasswordOptions<T extends string = string> = {
  conditions: Partial<ConditionMap<T>>;
  optionalMin?: number;
};

export type CheckMapResult = {
  name: string;
  state: 'failed' | 'successful';
  total: number;
  passedCount: number;
  expectedCount: number;
  errorMap: string[];
  message: string;
};

export type CheckPasswordResult = {
  passed: boolean;
  info: Record<string, CheckMapResult>;
};
