import { UserTypes } from '@modules/extra/models/user/user.model';

export function autoDeclare() {}

declare module 'express-session' {
  export type SessionUser = {
    id: string;
    name: string;
    email: string;
    role: UserTypes;
    visit: number;
  };

  interface SessionData {
    user: SessionUser;
    csrfToken: string;
  }
}
