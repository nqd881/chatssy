import { EmailService } from '@modules/extra/email';
import { ChatssyEmail } from '@modules/extra/email/chatssy-email';
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
import { ConfirmEmailTemplate } from '../../templates/ConfirmEmailTemplate';
import { flattenToDotObject } from '@modules/utils';
import { CreateUserWithEmailData } from './data-types';
@Injectable()
export class UserRegistrationService {
  constructor(
    @InjectModel(User) private model: UserModel,
    private tokenService: TokenService,
    private emailService: EmailService,
  ) {}

  async createUserWithEmail({
    first_name,
    last_name,
    username,
    password,
    birth_date,
    email,
  }: CreateUserWithEmailData) {
    return this.model.create({
      auth: {
        username,
        password,
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
    const url = `http://localhost:3000/users/registration/email/verify?user_id=${user.id}&token=${token}`;
    const email = new ChatssyEmail(
      {
        to: user.email.address,
        subject: 'Confirm Email',
      },
      ConfirmEmailTemplate,
    ).bind({ url });

    this.emailService.send(email);
  }

  async registerWithEmail(data: CreateUserWithEmailData) {
    const newUser = await this.createUserWithEmail(data);
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
