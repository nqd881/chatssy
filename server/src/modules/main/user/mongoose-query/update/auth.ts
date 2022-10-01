import { UpdateUserAuthData } from '../../modules/user-auth/data-types';
import { createPlainUpdateQuery } from '../create-plain-update-query';

export const UpdateAuthQuery = (data: UpdateUserAuthData) =>
  createPlainUpdateQuery('auth', data);
