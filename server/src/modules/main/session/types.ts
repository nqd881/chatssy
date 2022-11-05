import { Session } from '@modules/extra/models/session.model';
import { UserTypes } from '@modules/extra/models/user/user.model';

export type InitSessionData = Partial<
  Pick<Session, 'device' | 'os' | 'browser' | 'ip'>
> & {
  user_id: string;
  time: string | number;
};

export type SessionUserData = {
  id: string;
  name: string;
  email: string;
  tfa_enabled: boolean;
  type: UserTypes;
};

export type SessionCacheData = {
  sid: string;
  user: SessionUserData;
  visit: number;
  last_active_date: number;
  expiration_date: number;
  csrf_secret: string;
};
