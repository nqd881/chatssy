import { DbAddress } from '@dbmodels/address.model';
import { DbGenders } from '../../../../db-models/user2/user.model';

export type CreateUserAddressArgs = DbAddress;

export type CreateUserArgs = {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender?: DbGenders;
  address?: CreateUserAddressArgs;
};
