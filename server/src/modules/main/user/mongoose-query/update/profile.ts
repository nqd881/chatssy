import { UpdateUserProfileData } from '../../modules/user-profile/data-types';
import { createPlainUpdateQuery } from '../create-plain-update-query';

export const UpdateProfileQuery = (data: UpdateUserProfileData) =>
  createPlainUpdateQuery('profile', data);
