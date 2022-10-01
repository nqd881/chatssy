import { UserRoles } from '@schemas';

export function autoDeclare() {}

declare module 'express-session' {
  export type SessionUser = {
    id: string;
    name: string;
    email: string;
    role: UserRoles;
    visit: number;
  };

  interface SessionData {
    user: SessionUser;
    csrfToken: string;
  }
}
