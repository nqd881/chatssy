import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { Env } from 'src/env/types';
import { WrongCredentials } from 'src/exceptions/WrongCredentials.exception';
import { UserAuthService } from '../user-modules/user-auth/user-auth.service';
// import { UserSearchingService } from '../user/modules/user-searching/user-searching.service';
import { SessionService, SessionUserData } from '../session';
import { LoginData } from './data-types';

import { UserProfileService } from '../user-modules/user-profile/user-profile.service';
import { UserService } from '../user-modules/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private envConfig: ConfigService,
    private sessionService: SessionService,
    private userAuthService: UserAuthService,
    private userProfileService: UserProfileService,
    private userService: UserService,
  ) {}

  private async _login(
    req: Request,
    res: Response,
    userSessionData: SessionUserData,
  ) {
    const { ip } = req;
    const { device, os, browser } = req.useragent;

    await this.sessionService.create(req, res, userSessionData, {
      userId: userSessionData.id,
      device,
      os,
      browser,
      ip,
      time: this.envConfig.get(Env.SESSION_MAX_AGE),
    });

    return res.json(true);
    // return res.json(user);
  }

  async login(req: Request, res: Response, { username, password }: LoginData) {
    const userAuth = await this.userAuthService
      .fetchUserAuthByUsername(username)
      .findOne({ isActivated: true });

    if (!userAuth?.isActivated) throw WrongCredentials;

    const passwordValid = await this.userAuthService.comparePassword(
      userAuth.credentials.password,
      password,
    );

    if (!passwordValid) throw WrongCredentials;

    const userData = await this.userService.getFullUserInfo(
      userAuth.userId.toString(),
    );

    const { _id, auth, profile, setting, userType } = userData;

    const userSessionData = {
      id: _id.toString(),
      email: auth.mainEmail.emailAddress,
      name: `${profile.firstName} ${profile.lastName}`,
      type: userType,
      tfaEnabled: setting.security.tfa,
    };

    return this._login(req, res, userSessionData);
  }

  // async loginWithGoogle(req: Request, res: Response, token: string) {
  //   const ggPayload = await this.getGooglePayload(token);

  //   // let user = await this.userSearchingService.findByEmail(ggPayload.email);
  //   let userEmail = await this.userEmailModel.findOne({
  //     address: ggPayload.email,
  //   });

  //   if (!userEmail) {
  //     const userData = await this.userService.register({
  //       first_name: ggPayload.given_name,
  //       last_name: ggPayload.family_name,
  //       email: ggPayload.email,
  //       birth_date: null,
  //       ...this.userService.generateRandomCredentials(),
  //     });
  //   }

  //   return this._login(req, res, user);
  // }

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

  async detectMe(userID: string) {
    // return this.userSearchingService.findById(req.session.user.id);
    // return this.userProfileModel.findOne({ user_id: userID });
    return this.userProfileService.fetchUserProfile(userID);
  }

  async logout(req: Request, res: Response) {
    await this.sessionService.destroy(req, res);

    return res.json({ data: true });
  }
}
