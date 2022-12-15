import { DbRegistrationStatus } from '@dbmodels/user2/registration.model';

export type UpdateRegistrationQuery = Partial<{
  tokenId: string;
  status: DbRegistrationStatus;
}>;
