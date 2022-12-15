import {
  DbUserAccount,
  DbUserAccountModel,
} from '@dbmodels/user2/user-account.model';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from 'nestgoose';
import { Env } from 'src/env/types';
import { CreateUserAccountArgs } from './types/create';
import bcrypt from 'bcrypt';
import { flattenToDotObject } from '@utils';

@Injectable()
export class UserAccountDbService {
  constructor(
    @InjectModel(DbUserAccount) private userAccountModel: DbUserAccountModel,
    private envConfig: ConfigService,
  ) {}

  hashPassword(plainTextPassword: string | null) {
    if (!plainTextPassword) return null;

    const saltRounds = Number(this.envConfig.get(Env.PASSWORD_SALT_ROUNDS));
    return bcrypt.hash(plainTextPassword, saltRounds);
  }

  comparePassword(plainTextPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async new(args: CreateUserAccountArgs) {
    const { userId, email, phone, username, password, type } = args;

    return new this.userAccountModel({
      userId,
      mainEmail: {
        emailAddress: email,
      },
      phone: {
        phoneNumber: phone,
      },
      credentials: {
        username,
        password: await this.hashPassword(password),
      },
      type,
      isActivated: false,
    });
  }

  async create(args: CreateUserAccountArgs) {
    return (await this.new(args)).save();
  }

  async findById(userAccountId: string) {
    return this.userAccountModel.findById(userAccountId);
  }

  async update(userAccountId: string, query: any) {
    const updateQuery = flattenToDotObject(query);

    return this.userAccountModel.findByIdAndUpdate(userAccountId, updateQuery, {
      new: true,
    });
  }

  updateCredentials() {}

  updateMainEmail() {}

  updateExtraEmail() {}

  updatePhone() {}

  updateSecurity() {}

  async activateByEmail(userAccountId: string) {
    return this.update(userAccountId, {
      isActivated: true,
      mainEmail: {
        isVerified: true,
      },
    });
  }
}
