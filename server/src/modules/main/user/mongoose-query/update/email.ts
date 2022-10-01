import { UpdateUserEmailData } from '../../modules/user-info/data-types';
import { createPlainUpdateQuery } from '../create-plain-update-query';

export const UpdateEmailQuery = (data: UpdateUserEmailData) =>
  createPlainUpdateQuery(null, data);
