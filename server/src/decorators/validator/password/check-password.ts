import {
  LowercaseChecker,
  MaxChecker,
  MinChecker,
  NumericChecker,
  SymbolChecker,
  UppercaseChecker,
} from './checker';
import {
  CheckerConstructorMap,
  CheckerMap,
  CheckMapResult,
  CheckPasswordResult,
  CheckPasswordOptions,
} from './type';

export type ConditionName =
  | 'min'
  | 'max'
  | 'uppercase'
  | 'lowercase'
  | 'numeric'
  | 'symbol';

export const checkerConsMap: CheckerConstructorMap<ConditionName> = {
  min: MinChecker,
  max: MaxChecker,
  uppercase: UppercaseChecker,
  lowercase: LowercaseChecker,
  numeric: NumericChecker,
  symbol: SymbolChecker,
};

export const checkPassword = (
  value: string,
  { conditions, optionalMin = 0 }: CheckPasswordOptions<ConditionName>,
): CheckPasswordResult => {
  const requiredCheckerMap: CheckerMap = new Map(),
    optionalCheckerMap: CheckerMap = new Map();

  for (let [name, condition] of Object.entries(conditions)) {
    const required = condition?.required;
    const checker = new checkerConsMap[name](condition.expected);

    if (required) requiredCheckerMap.set(name, checker);
    else optionalCheckerMap.set(name, checker);
  }

  const checkMap = (name: string, map: CheckerMap, expectedCount?: number) => {
    const result: CheckMapResult = {
      name,
      state: 'failed',
      total: map.size,
      passedCount: 0,
      expectedCount: expectedCount
        ? Math.min(expectedCount, map.size)
        : map.size,
      errorMap: [],
      message: '',
    };

    for (let [_, checker] of map) {
      const { passed, message } = checker.check(value);
      if (passed) result.passedCount++;
      else result.errorMap.push(message);
    }

    if (result.passedCount >= result.expectedCount) result.state = 'successful';

    result.message = `[ Passed ${result.passedCount}/${
      result.total
    } conditions. Expect ${result.expectedCount} ]\n${result.errorMap
      .map((error) => ` - ${error}`)
      .join('\n')}`;

    return result;
  };

  const requiredResult = checkMap('Required', requiredCheckerMap);
  const optionalResult = checkMap('Optional', optionalCheckerMap, optionalMin);

  const passed =
    requiredResult.state === 'successful' &&
    optionalResult.state === 'successful';

  return {
    passed,
    info: {
      required: requiredResult,
      optional: optionalResult,
    },
  };
};
