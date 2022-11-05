import { UserDoc } from '@modules/extra/models/user/user.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { Env } from 'src/env/types';
import { WrongCredentials } from 'src/exceptions/WrongCredentials.exception';
import { UserAuthService } from '../user/modules/user-auth/user-auth.service';
import { UserRegistrationService } from '../user/modules/user-registration/user-registration.service';
import { UserSearchingService } from '../user/modules/user-searching/user-searching.service';
import { LoginData } from './data-types';
import { SessionService } from '../session';

@Injectable()
export class AuthService {
  constructor(
    private envConfig: ConfigService,
    private userSearchingService: UserSearchingService,
    private userAuthService: UserAuthService,
    private userRegistrationService: UserRegistrationService,
    private sessionService: SessionService,
  ) {}

  private async _login(req: Request, res: Response, user: UserDoc) {
    const { ip } = req;
    const { device, os, browser } = req.useragent;

    await this.sessionService.create(req, res, user, {
      user_id: user.id,
      device,
      os,
      browser,
      ip,
      time: this.envConfig.get(Env.SESSION_MAX_AGE),
    });

    return res.json({ data: user });
  }

  async login(req: Request, res: Response, data: LoginData) {
    const user = await this.userSearchingService.findByUsername(data.username);

    if (!user) throw WrongCredentials;
    if (!user.active) throw WrongCredentials;

    const passwordValid = await this.userAuthService.checkPassword(
      user,
      data.password,
    );
    if (!passwordValid) throw WrongCredentials;

    return this._login(req, res, user);
  }

  async loginWithGoogle(req: Request, res: Response, token: string) {
    const ggPayload = await this.getGooglePayload(token);

    let user = await this.userSearchingService.findByEmail(ggPayload.email);

    if (!user) {
      user = await this.userRegistrationService.register({
        first_name: ggPayload.given_name,
        last_name: ggPayload.family_name,
        email: ggPayload.email,
        birth_date: null,
        ...this.userRegistrationService.generateRandomCredentials(),
      });
    }

    return this._login(req, res, user);
  }

  async getGooglePayload(token: string) {
    try {
      const googleClient = new OAuth2Client(
        this.envConfig.get(Env.GOOGLE_CLIENT_ID),
      );

      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: this.envConfig.get(Env.GOOGLE_CLIENT_ID),
      });
      return ticket.getPayload();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async detectMe(req: Request) {
    return this.userSearchingService.findById(req.session.user.id);
  }

  async logout(req: Request, res: Response) {
    await this.sessionService.destroy(req, res);

    return res.json({ data: true });
  }
}
