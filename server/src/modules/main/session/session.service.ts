import {
  Session,
  SessionDoc,
  SessionModel,
  SessionStates,
} from '@modules/extra/models/session.model';
import { UserDoc } from '@modules/extra/models/user/user.model';
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
    @InjectModel(Session) private model: SessionModel,
    @Inject(CSRF_TOKEN_TOOLS) private csrfTokenTools: CSRFTokenTools,
  ) {}

  private initSession({
    user_id,
    time,
    device,
    os,
    browser,
    ip,
  }: InitSessionData) {
    const now = Date.now();

    return this.model.create({
      user_id,
      device,
      os,
      browser,
      ip,
      log_in_date: now,
      expiration_date: now + parseTimeMs(time),
    });
  }

  getSessionUserData(user: UserDoc): SessionUserData {
    return {
      id: user.id,
      email: user.getEmail(),
      name: user.getName(),
      tfa_enabled: user.setting.security.tfa,
      type: user.user_type,
    };
  }

  private cacheNewSession(
    req: Request,
    session: SessionDoc,
    userData: SessionUserData,
    csrfSecret: string,
  ) {
    req.session.sid = session.id;
    req.session.user = userData;
    req.session.last_active_date = null;
    req.session.expiration_date = session.expiration_date;
    req.session.visit = 0;
    req.session.csrf_secret = csrfSecret;
  }

  createCsrfToken(req: Request) {
    const secret = req.session.csrf_secret;
    return this.csrfTokenTools.create(secret);
  }

  verifyCsrfToken(req: Request, token: string) {
    const secret = req.session.csrf_secret;
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
    user: UserDoc,
    sessionData: InitSessionData,
  ) {
    const session = await this.initSession(sessionData);

    const userData = this.getSessionUserData(user);
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
