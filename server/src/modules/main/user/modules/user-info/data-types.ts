// import { User } from '@modules/extra/database/schemas';

import { UserEmail } from '@modules/extra/models/user/user-email.model';

// import { UserEmail } from '@modules/extra/models/user/user.model';

// export type UpdateUserEmailData = Partial<
//   Pick<User, 'email' | 'email_verified'>
// >;

// export type UpdateUserPhoneData = Partial<
//   Pick<User, 'phone' | 'phone_verified'>
// >;

export type UpdateUserEmailData = Partial<UserEmail>;
