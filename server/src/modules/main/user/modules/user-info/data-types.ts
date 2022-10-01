import { User } from '@modules/extra/database/schemas';

export type UpdateUserEmailData = Partial<
  Pick<User, 'email' | 'email_verified'>
>;

export type UpdateUserPhoneData = Partial<
  Pick<User, 'phone' | 'phone_verified'>
>;
