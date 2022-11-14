import { DbUserAuth } from 'src/db-models/user/user-auth.model';
import { DbUserProfile } from 'src/db-models/user/user-profile.model';
import { DbUserSetting } from 'src/db-models/user/user-setting';
import { DbUser } from 'src/db-models/user/user.model';
import { Types } from 'mongoose';

export type UserFullInfo = DbUser & {
  _id: Types.ObjectId;
  auth: Omit<DbUserAuth, 'username' | 'password'>;
  profile: DbUserProfile;
  setting: DbUserSetting;
};
