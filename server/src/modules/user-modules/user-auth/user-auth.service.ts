import {
  DbUserAuth,
  DbUserAuthDoc,
  DbUserAuthModel,
} from 'src/db-models/user/user-auth.model';
import { DbUser, DbUserModel } from 'src/db-models/user/user.model';
import { TfaService } from '@modules/tfa/tfa.service';
import { TokenService } from '@modules/token';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { flattenToDotObject } from '@utils';
import bcrypt from 'bcrypt';
import { isString } from 'lodash';
import { InjectModel } from 'nestgoose';
import { Env } from 'src/env/types';
import { WrongCredentials } from 'src/exceptions/WrongCredentials.exception';
import { UpdateAuthData } from './data-types';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(DbUser) private userModel: DbUserModel,
    @InjectModel(DbUserAuth) private userAuthModel: DbUserAuthModel,
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

  fetchUserAuthByUserID(userId: string) {
    return this.userAuthModel.findOne({ userId });
  }

  fetchUserAuthByUsername(username: string) {
    return this.userAuthModel.findOne({ username });
  }

  fetchUserAuthByMainEmail(email: string) {
    return this.userAuthModel.findOne({ 'mainEmail.emailAddress': email });
  }

  updateAuth(
    userAuthDoc: DbUserAuthDoc,
    data: UpdateAuthData,
  ): Promise<DbUserAuthDoc>;
  async updateAuth(
    userId: string,
    data: UpdateAuthData,
  ): Promise<DbUserAuthDoc>;
  async updateAuth(
    arg1: DbUserAuthDoc | string,
    arg2: UpdateAuthData,
  ): Promise<DbUserAuthDoc> {
    const { username, password } = arg2.credentials;
    const updateQuery = flattenToDotObject({
      username,
      password: password ? await this.hashPassword(password) : password,
    });

    if (isString(arg1)) {
      let userId = arg1;
      return this.userAuthModel.findOneAndUpdate({ userId }, updateQuery, {
        new: true,
      });
    }

    let userAuthDoc = arg1;
    userAuthDoc.set(updateQuery);
    return userAuthDoc.save();
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

  async forgotPassword(email: string) {
    const userAuth = await this.fetchUserAuthByUsername(email).findOne({
      isActivated: true,
    });

    if (!userAuth) return;

    const token = await this.tokenService.create('1h');
    this.sendResetPasswordEmail(userAuth.mainEmail.emailAddress, token.code);

    return true;
  }

  async resetPassword(userId: string, code: string, password: string) {
    const tokenValid = await this.tokenService.verify(code);

    if (!tokenValid) return null;
    return this.updateAuth(userId, { credentials: { password } });
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
    const userAuth = await this.fetchUserAuthByUserID(userId);

    const passwordValid = await this.comparePassword(
      userAuth.credentials.password,
      password,
    );

    if (!passwordValid) throw WrongCredentials;

    await this.updateAuth(userAuth, { credentials: { password: newPassword } });
    return true;
  }
}
