import { User, UserDocument, UserModel } from '@modules/extra/database/schemas';
import { EmailService } from '@modules/extra/email';
import { ChatssyEmail } from '@modules/extra/email/chatssyEmail';
import { VerificationTokenService } from '@modules/extra/verification_token';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import { combineQueries } from '../../mongoose-query/combine-queries';
import { IdFilter } from '../../mongoose-query/filter/id';
import { UpdateActiveQuery } from '../../mongoose-query/update/active';
import { UpdateAuthQuery } from '../../mongoose-query/update/auth';
import { UpdateEmailQuery } from '../../mongoose-query/update/email';
import { UpdatePhoneQuery } from '../../mongoose-query/update/phone';
import { UpdateProfileQuery } from '../../mongoose-query/update/profile';
import { ConfirmEmailTemplate } from '../../templates/ConfirmEmailTemplate';
import { ConfirmEmailToken } from '../../tokens/ConfirmEmailToken';
import crypto from 'crypto';
import {
  CreateUserWithEmailData,
  CreateUserWithPhoneData,
  UserAuthInitData,
  UserBaseInitData,
  UserEmailInitData,
  UserPhoneInitData,
} from './data-types';

@Injectable()
export class UserRegistrationService {
  constructor(
    @InjectModel(User.name) private model: UserModel,
    private vtService: VerificationTokenService,
    private emailService: EmailService,
  ) {}

  private get confirmEmailToken() {
    return this.vtService.generate(ConfirmEmailToken);
  }

  private buildUserCore(user: UserDocument, data: UserBaseInitData) {
    user.set(
      combineQueries(
        UpdateProfileQuery(
          pick(data, ['first_name', 'last_name', 'birth_date']),
        ),
        UpdateAuthQuery(pick(data, ['username', 'password'])),
      ),
    );

    return user;
  }

  private buildUserEmail(user: UserDocument, data: UserEmailInitData) {
    return user.set(UpdateEmailQuery(data));
  }

  private buildUserPhone(user: UserDocument, data: UserPhoneInitData) {
    return user.set(UpdatePhoneQuery(data));
  }

  private createUserWithCore(data: UserBaseInitData) {
    const newUser = new this.model();
    return this.buildUserCore(newUser, data);
  }

  createUserWithEmail(data: CreateUserWithEmailData) {
    const newUser = this.createUserWithCore(data);
    return this.buildUserEmail(newUser, data).save();
  }

  createUserWithPhone(data: CreateUserWithPhoneData) {
    const newUser = this.createUserWithCore(data);
    return this.buildUserPhone(newUser, data).save();
  }

  async sendVerifyUserEmail(user: UserDocument, token: string) {
    const url = `http://localhost:3000/user/registration/email/verify?user_id=${user.id}&token=${token}`;
    const email = new ChatssyEmail(
      {
        to: user.email,
        subject: 'Confirm Email',
      },
      ConfirmEmailTemplate,
    ).bind({ url });

    this.emailService.send(email);
  }

  async registerWithEmail(data: CreateUserWithEmailData) {
    const newUser = await this.createUserWithEmail(data);
    const token = await this.confirmEmailToken.create(newUser.id);
    this.sendVerifyUserEmail(newUser, token);
    return newUser;
  }

  async verifyEmail(userId: string, code: string) {
    const token = await this.confirmEmailToken.verify(userId, code);
    if (token) {
      return this.model.findOneAndUpdate(
        IdFilter(userId),
        combineQueries(
          UpdateActiveQuery(true),
          UpdateEmailQuery({ email_verified: true }),
        ),
        { new: true },
      );
    }

    return null;
  }

  generateRandomCredentials(): UserAuthInitData {
    const random = () => crypto.randomBytes(10).toString('hex');

    return {
      username: random(),
      password: random(),
    };
  }
}
