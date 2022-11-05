import ms from 'ms';

export const parseTimeMs = (value: string | number) => {
  return typeof value === 'number' ? value : ms(value);
};
