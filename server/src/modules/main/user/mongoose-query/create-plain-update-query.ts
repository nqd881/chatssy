import { PartialDocument } from '@modules/extra/database';

export const createPlainUpdateQuery = <U extends PartialDocument>(
  path: string | null,
  data: U,
) => {
  let updateQuery: PartialDocument = {};
  let handledKeys: (key: string) => string;

  if (path === null || path === '') handledKeys = (key: string) => key;
  else handledKeys = (key: string) => `${path}.${key}`;

  for (let key in data) {
    updateQuery[handledKeys(key)] = data[key];
  }
  return updateQuery;
};
