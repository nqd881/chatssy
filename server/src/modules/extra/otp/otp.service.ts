import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto';
import { totp } from 'otplib';
import { TOTP, TOTPOptions } from 'otplib/core';
import { Env } from 'src/env/types';

export type GenerateFn = (userId: string) => string;
export type VerifyFn = (userId: string, otp: string) => boolean;
export type TOTPPair = {
  generate: GenerateFn;
  verify: VerifyFn;
};

@Injectable()
export class OtpService {
  @Inject()
  envConfig: ConfigService;

  private createHmac(userId: string) {
    const salt = this.envConfig.get(Env.OTP_SALT);
    const hmacSecret = `${userId}_${salt}`;

    return crypto.createHmac('sha256', hmacSecret);
  }

  private createSecretKey(userId: string) {
    const hmac = this.createHmac(userId);
    hmac.update(userId);
    return hmac.digest('hex');
  }

  generateTOTP(myTOTP: TOTP, userId: string) {
    const secretKey = this.createSecretKey(userId);
    return myTOTP.generate(secretKey);
  }

  verifyTOTP(myTOTP: TOTP, userId: string, token: string) {
    return myTOTP.check(token, this.createSecretKey(userId));
  }

  createTOTPPair(totpOptions: Partial<TOTPOptions<string>>): TOTPPair {
    const myTOTP = totp.clone(totpOptions);
    const generateFn = this.generateTOTP.bind(this, myTOTP);
    const verifyFn = this.verifyTOTP.bind(this, myTOTP);

    return {
      generate: generateFn,
      verify: verifyFn,
    };
  }
}
