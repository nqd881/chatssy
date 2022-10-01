export abstract class ComparisonOperator {
  abstract description: string;
  abstract compare(expected: number, value: number): boolean;
}

export type ComparisonOperatorConstructor = new () => ComparisonOperator;

export class Gte extends ComparisonOperator {
  description = 'greater than or equal to';

  compare(expected: number, value: number) {
    return value >= expected;
  }
}

export class Gt extends ComparisonOperator {
  description = 'greater than';

  compare(expected: number, value: number) {
    return value > expected;
  }
}

export class Lte extends ComparisonOperator {
  description = 'less than or equal to';

  compare(expected: number, value: number) {
    return value <= expected;
  }
}

export class Lt extends ComparisonOperator {
  description = 'less than';

  compare(expected: number, value: number) {
    return value < expected;
  }
}

export class Eq extends ComparisonOperator {
  description = 'equal to';

  compare(expected: number, value: number) {
    return value === expected;
  }
}

export class Ne extends ComparisonOperator {
  description = 'not equal to';

  compare(expected: number, value: number) {
    return value !== expected;
  }
}

export enum Operators {
  GTE = 'gte',
  GT = 'gt',
  LTE = 'lte',
  LT = 'lt',
  EQ = 'eq',
  NE = 'ne',
}

export const operatorMap: Record<Operators, ComparisonOperatorConstructor> = {
  gte: Gte,
  gt: Gt,
  lte: Lte,
  lt: Lt,
  eq: Eq,
  ne: Ne,
};
