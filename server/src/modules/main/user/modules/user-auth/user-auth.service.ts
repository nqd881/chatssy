import { User, UserModel } from '@modules/extra/database/schemas';
import { EmailService } from '@modules/extra/email';
import { ChatssyEmail } from '@modules/extra/email/chatssyEmail';
import { VerificationTokenService } from '@modules/extra/verification_token';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Env } from 'src/env/types';
import { IdFilter } from '../../mongoose-query/filter/id';
import { UpdateAuthQuery } from '../../mongoose-query/update/auth';
import { ResetPasswordTemplate } from '../../templates/ResetPasswordTemplate';
import { ResetPasswordToken } from '../../tokens/ResetPasswordToken';
import { UpdateUserAuthData } from './data-types';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User.name) private model: UserModel,
    private vtService: VerificationTokenService,
    private emailService: EmailService,
    private envConfig: ConfigService,
  ) {}

  private get resetPasswordToken() {
    return this.vtService.generate(ResetPasswordToken);
  }

  async hashPassword(plainTextPassword: string | null) {
    if (!plainTextPassword) return null;

    const saltRounds = Number(this.envConfig.get(Env.PASSWORD_SALT_ROUNDS));
    return bcrypt.hash(plainTextPassword, saltRounds);
  }

  async comparePassword(hashedPassword: string, plainTextPassword: string) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async sendResetPasswordEmail(emailAddress: string, token: string) {
    const url = `http://localhost:3000/user/password_reset?token${token}`;
    const email = new ChatssyEmail(
      {
        to: emailAddress,
        subject: 'Reset Password',
      },
      ResetPasswordTemplate,
    ).bind({ url });

    this.emailService.send(email);
  }

  async resetPassword1(email: string) {
    const user = await this.model.findOne({ email });
    if (!user) return;

    const token = await this.resetPasswordToken.create(user.id);
    this.sendResetPasswordEmail(email, token);
    return;
  }

  async resetPassword2(userId: string, tokenValue: string, password: string) {
    const token = await this.resetPasswordToken.verify(userId, tokenValue);

    if (token) return this.updateAuth(userId, { password });

    return null;
  }

  async updateAuth(userId: string, data: UpdateUserAuthData) {
    return this.model.findOneAndUpdate(
      IdFilter(userId),
      UpdateAuthQuery({
        ...data,
        password: await this.hashPassword(data.password),
      }),
      { new: true },
    );
  }
}
