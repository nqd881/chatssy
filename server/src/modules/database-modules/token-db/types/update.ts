import { DbTokenStatus } from '@dbmodels/token.model';

export type UpdateTokenQuery = {
  status: DbTokenStatus;
};
