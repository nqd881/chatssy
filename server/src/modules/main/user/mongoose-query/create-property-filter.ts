export const createPropertyFilter =
  <T>(path: string) =>
  (...data: T[]) => {
    if (data.length <= 1) return { [path]: data?.[0] };
    return { [path]: { $in: data } };
  };
