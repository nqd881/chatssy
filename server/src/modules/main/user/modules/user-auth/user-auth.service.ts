import { EmailService } from '@modules/extra/email';
import { ChatssyEmail } from '@modules/extra/email/chatssy-email';
import { User, UserModel } from '@modules/extra/models/user/user.model';
import { TokenService } from '@modules/main/token';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { InjectModel } from 'nestgoose';
import { Env } from 'src/env/types';
import { ResetPasswordTemplate } from '../../templates/ResetPasswordTemplate';
import { flattenToDotObject } from '@modules/utils';
import { UpdateUserAuthData } from './data-types';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User) private userModel: UserModel,
    private tokenService: TokenService,
    private emailService: EmailService,
    private envConfig: ConfigService,
  ) {}

  async hashPassword(plainTextPassword: string | null) {
    if (!plainTextPassword) return null;

    const saltRounds = Number(this.envConfig.get(Env.PASSWORD_SALT_ROUNDS));
    return bcrypt.hash(plainTextPassword, saltRounds);
  }

  async comparePassword(hashedPassword: string, plainTextPassword: string) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async sendResetPasswordEmail(emailAddress: string, token: string) {
    const url = `http://localhost:3000/users/password_reset?token=${token}`;
    const email = new ChatssyEmail(
      {
        to: emailAddress,
        subject: 'Reset Password',
      },
      ResetPasswordTemplate,
    ).bind({ url });

    this.emailService.send(email);
  }

  async resetPasswordStep1(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) return;

    const token = await this.tokenService.create('1h');
    this.sendResetPasswordEmail(email, token.code);
    return token;
  }

  async resetPasswordStep2(userId: string, code: string, password: string) {
    const tokenValid = await this.tokenService.verify(code);

    if (tokenValid) return this.updateAuth(userId, { password });

    return null;
  }

  async updateAuth(userId: string, { username, password }: UpdateUserAuthData) {
    const updateQuery = flattenToDotObject(
      {
        auth: {
          username,
          password: password ? await this.hashPassword(password) : password,
        },
      },
      {
        ignoreUndefined: true,
      },
    );

    return this.userModel.findByIdAndUpdate(userId, updateQuery, { new: true });
  }
}
