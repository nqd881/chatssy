import { TfaVerificationCodeService } from '@modules/extra/tfa-verification-code/tfa-verification-code.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserSearchingService } from '../user/modules/user-searching/user-searching.service';
import { TfaCodeTypes, TfaCode } from './types';

@Injectable()
export class TfaService {
  constructor(
    private codeService: TfaVerificationCodeService,
    private userSearchingService: UserSearchingService,
    private mailerService: MailerService,
  ) {}

  async sendEmailCode(email: string) {
    const user = await this.userSearchingService.findByEmail(email);

    if (!user) return null;

    const code = await this.codeService.get(user.id);

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
