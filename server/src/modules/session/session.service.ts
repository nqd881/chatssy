import {
  DbSession,
  DbSessionDoc,
  DbSessionModel,
  SessionStates,
} from 'src/db-models/session.model';
import { DbUserDoc } from 'src/db-models/user/user.model';
import { Inject, Injectable } from '@nestjs/common';
import { parseTimeMs } from '@utils';
import CSRFTokenTools from 'csrf';
import { Request, Response } from 'express';
import { InjectModel } from 'nestgoose';
import { CSRF_TOKEN, CSRF_TOKEN_TOOLS } from './constant';
import { InitSessionData, SessionUserData } from './types';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(DbSession) private model: DbSessionModel,
    @Inject(CSRF_TOKEN_TOOLS) private csrfTokenTools: CSRFTokenTools,
  ) {}

  private initSession({
    userId,
    time,
    device,
    os,
    browser,
    ip,
  }: InitSessionData) {
    const now = Date.now();

    return this.model.create({
      userId,
      device,
      os,
      browser,
      ip,
      loginDate: now,
      expirationDate: now + parseTimeMs(time),
    });
  }

  // getSessionUserData(user: DbUserDoc): SessionUserData {
  //   return {
  //     id: user.id,
  //     email: user.getEmail(),
  //     name: user.getName(),
  //     tfa_enabled: user.setting.security.tfa,
  //     type: user.user_type,
  //   };
  // }

  private cacheNewSession(
    req: Request,
    session: DbSessionDoc,
    userData: SessionUserData,
    csrfSecret: string,
  ) {
    req.session.sid = session.id;
    req.session.user = userData;
    req.session.lastActiveDate = null;
    req.session.expirationDate = session.expirationDate;
    req.session.visit = 0;
    req.session.csrfSecret = csrfSecret;
  }

  createCsrfToken(req: Request) {
    const secret = req.session.csrfSecret;
    return this.csrfTokenTools.create(secret);
  }

  verifyCsrfToken(req: Request, token: string) {
    const secret = req.session.csrfSecret;
    return this.csrfTokenTools.verify(secret, token);
  }

  setCsrfCookie(res: Response, token: string) {
    res.cookie(CSRF_TOKEN, token);
  }

  regenerateCsrfToken(req: Request, res: Response) {
    const newToken = this.createCsrfToken(req);

    this.setCsrfCookie(res, newToken);
  }

  async create(
    req: Request,
    res: Response,
    userData: SessionUserData,
    sessionData: InitSessionData,
  ) {
    const session = await this.initSession(sessionData);

    const csrfSecret = await this.csrfTokenTools.secret();
    const csrfToken = this.csrfTokenTools.create(csrfSecret);

    this.cacheNewSession(req, session, userData, csrfSecret);
    this.setCsrfCookie(res, csrfToken);

    return req;
  }

  async destroy(req: Request, res: Response) {
    await this.model.findByIdAndUpdate(req.session.sid, {
      state: SessionStates.Expired,
    });

    req.session.destroy(() => {});

    return res.cookie(CSRF_TOKEN, { expires: Date.now() });
  }
}
