import { UpdateUserPhoneData } from '../../modules/user-info/data-types';
import { createPlainUpdateQuery } from '../create-plain-update-query';

export const UpdatePhoneQuery = (data: UpdateUserPhoneData) =>
  createPlainUpdateQuery(null, data);
