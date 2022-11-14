import {
  DbUserAuth,
  DbUserAuthModel,
} from 'src/db-models/user/user-auth.model';
import { TfaVerificationCodeService } from '@modules/tfa-verification-code/tfa-verification-code.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestgoose';
import { TfaCode, TfaCodeTypes } from './types';

@Injectable()
export class TfaService {
  constructor(
    private codeService: TfaVerificationCodeService,
    private mailerService: MailerService,
    @InjectModel(DbUserAuth) private userAuthModel: DbUserAuthModel,
  ) {}

  async sendEmailCode(email: string) {
    const userAuth = await this.userAuthModel.findOne({
      'mainEmail.emailAddress': email,
      'mainEmail.isVerified': true,
      isActivated: true,
    });

    if (!userAuth) return null;

    const code = await this.codeService.get(userAuth.userId.toString());

    this.mailerService.sendMail({
      to: email,
      subject: 'Tfa Code',
      template: 'tfa_code',
      context: {
        code: code.value,
      },
    });
  }

  async verifyEmailCode(userId: string, value: string) {
    return this.codeService.verify(userId, value);
  }

  async verifyCode(userId: string, { type, value }: TfaCode) {
    switch (type) {
      case TfaCodeTypes.VERIFICATION_CODE:
        return this.verifyEmailCode(userId, value);
    }
  }
}
