import { operatorMap, Operators } from './comparison-operator';

export interface CheckerConstructor {
  new (expectedCount: number): Checker;
}

export abstract class Checker {
  protected operatorMap = operatorMap;

  abstract getCount(value: string): number;
  abstract operator: Operators;
  abstract unit: string;

  constructor(public expectedCount: number) {}

  private formatUnit(option: number | boolean = false) {
    if (option > 1 || Boolean(option)) return `${this.unit}s`;
    return this.unit;
  }

  check(value: string) {
    const count = this.getCount(value);
    const comparison = new this.operatorMap[this.operator]();

    const passed = comparison.compare(this.expectedCount, count);
    const message = `The number of ${this.formatUnit(
      true,
    )} in the value must be ${comparison.description} ${this.expectedCount}.`;

    return { passed, message };
  }
}

export class MinChecker extends Checker {
  getCount(value: string) {
    return value.length;
  }

  operator = Operators.GTE;
  unit = 'character';
}

export class MaxChecker extends Checker {
  getCount(value: string) {
    return value.length;
  }

  operator = Operators.LTE;
  unit = 'character';
}

export class UppercaseChecker extends Checker {
  getCount(value: string) {
    return value.match(/[A-Z]/g)?.length ?? 0;
  }

  operator = Operators.GTE;
  unit = 'uppercase-character';
}

export class LowercaseChecker extends Checker {
  getCount(value: string) {
    return value.match(/[a-z]/g)?.length ?? 0;
  }

  operator = Operators.GTE;
  unit = 'lowercase-character';
}

export class NumericChecker extends Checker {
  getCount(value: string) {
    return value.match(/[0-9]/g)?.length ?? 0;
  }

  operator = Operators.GTE;
  unit = 'numeric-character';
}

export class SymbolChecker extends Checker {
  getCount(value: string) {
    return value.match(/[^A-Za-z0-9]/g)?.length ?? 0;
  }

  operator = Operators.GTE;
  unit = 'symbol-character';
}
