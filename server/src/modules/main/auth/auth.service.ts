import { UserDocument } from '@modules/extra/database/schemas';
import { EmailService } from '@modules/extra/email';
import { OtpService } from '@modules/extra/otp';
import { PasswordService } from '@modules/extra/password';
import { REDIS } from '@modules/extra/redis_cache';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatssyReq, ChatssyRes } from '@types';
// import { ChatssyReq, ChatssyRes } from '@types';
import { OAuth2Client } from 'google-auth-library';
import * as IORedis from 'ioredis';
import { Env } from 'src/env/types';
import { WrongCredentials } from 'src/exceptions/WrongCredentials.exception';
import { UserAuthService } from '../user/modules/user-auth/user-auth.service';
import { UserRegistrationService } from '../user/modules/user-registration/user-registration.service';
import { UserSearchingService } from '../user/modules/user-searching/user-searching.service';
import { LoginData } from './data-types';
import { CsrfService } from './services/csrf.service';

@Injectable()
export class AuthService {
  @Inject()
  envConfig: ConfigService;

  @Inject(REDIS)
  redis: IORedis.Redis;

  @Inject()
  csrfService: CsrfService;

  @Inject()
  emailService: EmailService;

  @Inject()
  passwordService: PasswordService;

  @Inject()
  otpService: OtpService;

  @Inject()
  userSearchingService: UserSearchingService;

  @Inject()
  userRegistrationService: UserRegistrationService;

  @Inject()
  userAuthService: UserAuthService;

  constructor() {}

  private async coreLogin(
    req: ChatssyReq,
    res: ChatssyRes,
    user: UserDocument,
  ) {
    this.createSession(req, user);
    res.cookie('CSRF-Token', this.csrfService.create());
    return res.json({ data: user });
  }

  async login(req: ChatssyReq, res: ChatssyRes, data: LoginData) {
    const user = await this.userSearchingService.findByUsername(data.username);

    if (!user) throw WrongCredentials;
    if (!user.active) throw WrongCredentials;

    if (
      !this.userAuthService.comparePassword(user.auth.password, data.password)
    )
      throw WrongCredentials;

    return this.coreLogin(req, res, user);
  }

  async loginWithGoogle(req: ChatssyReq, res: ChatssyRes, token: string) {
    const payload = await this.getGooglePayload(token);

    let user = await this.userSearchingService.findByEmail(payload.email);

    if (!user) {
      user = await this.userRegistrationService.registerWithEmail({
        first_name: payload.given_name,
        last_name: payload.family_name,
        email: payload.email,
        birth_date: null,
        ...this.userRegistrationService.generateRandomCredentials(),
      });
    }

    return this.coreLogin(req, res, user);
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

  async detectMe(req: ChatssyReq) {
    return this.userSearchingService.findById(req.session.user.id);
  }

  logout(request: ChatssyReq) {
    request.session.destroy(() => {});
  }

  createSession(req: ChatssyReq, data: any) {
    req.session.user = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      visit: 1,
    };
  }
}
