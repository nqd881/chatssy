import { DbUserAccountTypes } from '@dbmodels/user2/user-account.model';

export class CreateUserAccountArgs {
  userId: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  type: DbUserAccountTypes;
}
