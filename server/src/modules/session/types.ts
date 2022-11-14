import { DbSession } from 'src/db-models/session.model';
import { UserTypes } from 'src/db-models/user/user.model';

export type InitSessionData = Partial<
  Pick<DbSession, 'device' | 'os' | 'browser' | 'ip'>
> & {
  userId: string;
  time: string | number;
};

export type SessionUserData = {
  id: string;
  name: string;
  email: string;
  type: UserTypes;
  tfaEnabled?: boolean;
};

export type SessionCacheData = {
  sid: string;
  user: SessionUserData;
  visit: number;
  lastActiveDate: number;
  expirationDate: number;
  csrfSecret: string;
};
