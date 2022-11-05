import {
  User,
  UserDoc,
  UserModel,
} from '@modules/extra/models/user/user.model';
import { TokenService } from '@modules/main/token';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { InjectModel } from 'nestgoose';
import { Env } from 'src/env/types';
import { flattenToDotObject } from '@utils';
import { UpdateAuthData } from './data-types';
import { MailerService } from '@nestjs-modules/mailer';
import { TfaService } from '@modules/main/tfa/tfa.service';
import { WrongCredentials } from 'src/exceptions/WrongCredentials.exception';
import { isString } from 'lodash';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User) private userModel: UserModel,
    private tokenService: TokenService,
    private mailerService: MailerService,
    private envConfig: ConfigService,
    private tfaService: TfaService,
  ) {}

  async hashPassword(plainTextPassword: string | null) {
    if (!plainTextPassword) return null;

    const saltRounds = Number(this.envConfig.get(Env.PASSWORD_SALT_ROUNDS));
    return bcrypt.hash(plainTextPassword, saltRounds);
  }

  async comparePassword(hashedPassword: string, plainTextPassword: string) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async checkPassword(userDoc: UserDoc, password: string): Promise<boolean>;
  async checkPassword(userId: string, password: string): Promise<boolean>;
  async checkPassword(arg1: UserDoc | string, arg2: string): Promise<boolean> {
    let user: UserDoc;

    if (typeof arg1 === 'string') user = await this.userModel.findById(arg1);
    else user = arg1;

    return this.comparePassword(user.auth.password, arg2);
  }

  updateAuth(userDoc: UserDoc, data: UpdateAuthData): Promise<UserDoc>;
  async updateAuth(userId: string, data: UpdateAuthData): Promise<UserDoc>;
  async updateAuth(
    arg1: UserDoc | string,
    arg2: UpdateAuthData,
  ): Promise<UserDoc> {
    const { username, password } = arg2;
    const updateQuery = flattenToDotObject({
      auth: {
        username,
        password: password ? await this.hashPassword(password) : password,
      },
    });

    if (isString(arg1)) {
      let userId = arg1;
      return this.userModel.findByIdAndUpdate(userId, updateQuery, {
        new: true,
      });
    }

    let userDoc = arg1;
    userDoc.set(updateQuery);
    return userDoc.save();
  }

  async sendResetPasswordEmail(emailAddress: string, token: string) {
    const url = `http://localhost:3000/users/password_reset?token=${token}`;

    this.mailerService.sendMail({
      to: emailAddress,
      subject: 'Reset Password',
      template: 'reset_password',
      context: {
        url,
      },
    });
  }

  async resetPasswordStep1(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) return;

    const token = await this.tokenService.create('1h');
    this.sendResetPasswordEmail(email, token.code);

    return true;
  }

  async resetPasswordStep2(userId: string, code: string, password: string) {
    const tokenValid = await this.tokenService.verify(code);

    if (!tokenValid) return null;
    return this.updateAuth(userId, { password });
  }

  async changePasswordStep1(email: string) {
    this.tfaService.sendEmailCode(email);
    return true;
  }

  async changePasswordStep2(
    userId: string,
    password: string,
    newPassword: string,
  ) {
    const user = await this.userModel.findById(userId);

    const passwordValid = await this.checkPassword(user, password);

    if (!passwordValid) throw WrongCredentials;

    await this.updateAuth(user, { password: newPassword });
    return true;
  }
}
