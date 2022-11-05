import { SessionCacheData } from '@modules/main/session';
import { IResult } from 'ua-parser-js';

export function autoDeclare() {}

declare module 'express-session' {
  export interface SessionData extends SessionCacheData {}
}

declare module 'express-serve-static-core' {
  interface Request {
    useragent: IResult;
  }
}
