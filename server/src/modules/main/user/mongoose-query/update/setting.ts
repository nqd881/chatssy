import { UpdateUserSettingData } from '../../modules/user-setting/data-types';
import { createPlainUpdateQuery } from '../create-plain-update-query';

export const UpdateSettingQuery = (data: UpdateUserSettingData) =>
  createPlainUpdateQuery('setting', data);
