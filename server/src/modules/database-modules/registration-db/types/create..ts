export type CreateRegistrationArgs = {
  userId: string;
  accountId: string;
  tokenId: string;
  emailAddress: string;
  redirectUrlOnSuccess?: string;
  redirectUrlOnFailure?: string;
};
