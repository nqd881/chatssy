import { PickSchema } from '@modules/extra/database';
import { User, UserAuth, UserProfile } from '@modules/extra/database/schemas';

export type UserProfileInitData = PickSchema<
  UserProfile,
  ['first_name', 'last_name'][number],
  ['birth_date'][number]
>;

export type UserAuthInitData = PickSchema<
  UserAuth,
  ['username', 'password'][number],
  never
>;

export type UserEmailInitData = PickSchema<User, 'email', 'email_verified'>;
export type UserPhoneInitData = PickSchema<User, 'phone', 'phone_verified'>;

export type UserBaseInitData = UserProfileInitData & UserAuthInitData;

export type CreateUserWithEmailData = UserBaseInitData & UserEmailInitData;
export type CreateUserWithPhoneData = UserBaseInitData & UserPhoneInitData;

export type CreateUserData = CreateUserWithEmailData | CreateUserWithPhoneData;
