import { CreateRegistrationArgs } from '@modules/database-modules/registration-db/types/create.';
import { CreateUserAccountArgs } from '@modules/database-modules/user-account-db/types/create';
import { CreateUserArgs } from '@modules/database-modules/user-db/types/create';

export type RegisterArgs = CreateUserArgs &
  Omit<CreateUserAccountArgs, 'userId' | 'type'> &
  Pick<CreateRegistrationArgs, 'redirectUrlOnSuccess' | 'redirectUrlOnFailure'>;
