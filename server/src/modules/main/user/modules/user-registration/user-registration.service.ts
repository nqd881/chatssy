import {
  User,
  UserDoc,
  UserModel,
} from '@modules/extra/models/user/user.model';
import { TokenService } from '@modules/main/token';
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { InjectModel } from 'nestgoose';
import { v4 as uuidv4 } from 'uuid';
import { flattenToDotObject } from '@utils';
import { CreateUserData } from './data-types';
import { MailerService } from '@nestjs-modules/mailer';
import { UserAuthService } from '../user-auth/user-auth.service';
@Injectable()
export class UserRegistrationService {
  constructor(
    @InjectModel(User) private model: UserModel,
    private tokenService: TokenService,
    private mailerService: MailerService,
    private userAuthService: UserAuthService,
  ) {}

  async createUser({
    first_name,
    last_name,
    username,
    password,
    birth_date,
    email,
  }: CreateUserData) {
    return this.model.create({
      auth: {
        username,
        password: await this.userAuthService.hashPassword(password),
      },
      email: {
        address: email,
      },
      profile: {
        first_name,
        last_name,
        birth_date,
      },
    });
  }

  async sendVerifyUserEmail(user: UserDoc, token: string) {
    const url = `http://localhost:3000/users/registration/email?user_id=${user.id}&token=${token}`;

    this.mailerService.sendMail({
      to: user.email.address,
      subject: 'Confirm Email',
      template: 'confirm_email',
      context: {
        url,
      },
    });
  }

  async register(data: CreateUserData) {
    const newUser = await this.createUser(data);
    const token = await this.tokenService.create('10m');

    this.sendVerifyUserEmail(newUser, token.code);
    return newUser;
  }

  async verifyEmail(userId: string, code: string) {
    const token = await this.tokenService.verify(code);

    if (token) {
      const updateQuery = flattenToDotObject(
        {
          active: true,
          email: {
            address: undefined,
            is_verified: true,
          },
        },
        { ignoreUndefined: true },
      );

      return this.model.findByIdAndUpdate(userId, updateQuery, { new: true });
    }

    return null;
  }

  generateRandomCredentials() {
    return {
      username: uuidv4(),
      password: crypto.randomBytes(10).toString('hex'),
    };
  }
}
