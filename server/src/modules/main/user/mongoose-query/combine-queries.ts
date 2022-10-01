export const combineQueries = <T extends Object>(...queries: T[]) =>
  queries.reduce((pre, cur) => ({ ...pre, ...cur }), {});
