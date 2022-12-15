import {
  DbUserAuth,
  DbUserAuthModel,
} from 'src/db-models/user/user-auth.model';
import {
  DbUserProfile,
  DbUserProfileModel,
} from 'src/db-models/user/user-profile.model';
import {
  DbUserSetting,
  DbUserSettingModel,
} from 'src/db-models/user/user-setting';
import { DbUser, DbUserModel } from 'src/db-models/user/user.model';
import { TokenService } from '@modules/token';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { flattenToDotObject } from '@utils';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { InjectModel } from 'nestgoose';
import { v4 as uuidv4 } from 'uuid';
import { UserAuthService } from '../user-auth/user-auth.service';
import { CreateUserData } from './data-types';
import { UserFullInfo } from './types';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/env/types';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(DbUser) private userModel: DbUserModel,
    @InjectModel(DbUserAuth) private userAuthModel: DbUserAuthModel,
    @InjectModel(DbUserProfile) private userProfileModel: DbUserProfileModel,
    @InjectModel(DbUserSetting) private userSettingModel: DbUserSettingModel,
    private tokenService: TokenService,
    private mailerService: MailerService,
    private userAuthService: UserAuthService,
    private envConfig: ConfigService,
  ) {}

  async createUser({
    firstName,
    lastName,
    username,
    password,
    birthDate,
    email,
  }: CreateUserData) {
    const userId = new mongoose.Types.ObjectId();

    const [userAuth, userProfile, userSetting] = await Promise.all([
      this.userAuthModel.create({
        userId,
        username,
        password: await this.userAuthService.hashPassword(password),
        mainEmail: {
          emailAddress: email,
        },
      }),
      this.userProfileModel.create({
        userId,
        firstName,
        lastName,
        birthDate,
      }),
      this.userSettingModel.create({
        userId,
      }),
    ]);

    const user = await this.userModel.create({
      _id: userId,
      profileId: userProfile.id,
      authId: userAuth.id,
      settingId: userSetting.id,
    });

    return {
      user,
      auth: userAuth,
      profile: userProfile,
      setting: userSetting,
    };
  }

  async sendVerifyMainEmail(
    emailAddress: string,
    userId: string,
    token: string,
  ) {
    const DOMAIN = this.envConfig.get(Env.DOMAIN);
    const url = `http://${DOMAIN}/api/user/registration/email?user_id=${userId}&token=${token}`;

    this.mailerService.sendMail({
      to: emailAddress,
      subject: 'Confirm Email',
      template: 'confirm_email',
      context: {
        url,
      },
    });
  }

  async registerWithEmail(data: CreateUserData) {
    const userAuth = await this.userAuthModel.findOne({
      $or: [
        { username: data.username },
        { 'mainEmail.emailAddress': data.email },
      ],
    });

    if (userAuth) throw new BadRequestException('Email or username is existed');

    const userData = await this.createUser(data);

    const token = await this.tokenService.create('VerifyEmailToken', '10m');
    this.sendVerifyMainEmail(
      userData.auth.mainEmail.emailAddress,
      userData.auth.userId.toString(),
      token.code,
    );

    return userData.profile;
  }

  async verifyMainEmail(userId: string, code: string) {
    const token = await this.tokenService.verify('VerifyEmailToken', code);

    if (token) {
      await this.userAuthModel.findOneAndUpdate(
        { userId },
        flattenToDotObject({
          mainEmail: {
            isVerified: true,
          },
          isActivated: true,
        }),
      );

      return true;
    }

    return null;
  }

  generateRandomCredentials() {
    return {
      username: uuidv4(),
      password: crypto.randomBytes(10).toString('hex'),
    };
  }

  async getFullUserInfo(userId: string) {
    const uID = new mongoose.Types.ObjectId(userId);

    const docs = await this.userModel.aggregate([
      {
        $match: {
          _id: uID,
        },
      },
      { $limit: 1 },
      {
        $lookup: {
          from: 'dbuserauths',
          let: {
            userId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$userId', '$$userId'],
                },
              },
            },
            { $limit: 1 },
            {
              $unset: ['_id', '__v', 'username', 'password'],
            },
          ],
          as: 'auth',
        },
      },
      {
        $lookup: {
          from: 'dbuserprofiles',
          let: {
            userId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$userId', '$$userId'],
                },
              },
            },
            { $limit: 1 },
            {
              $unset: ['_id', '__v'],
            },
          ],
          as: 'profile',
        },
      },
      {
        $lookup: {
          from: 'dbusersettings',
          let: {
            userId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$userId', '$$userId'],
                },
              },
            },
            { $limit: 1 },
            {
              $unset: ['_id', '__v'],
            },
          ],
          as: 'setting',
        },
      },
      {
        $set: {
          auth: {
            $first: '$auth',
          },
          profile: {
            $first: '$profile',
          },
          setting: {
            $first: '$setting',
          },
        },
      },
      {
        $unset: ['authId', 'profileId', 'settingId', '__v'],
      },
    ]);

    return docs[0] as UserFullInfo;
  }
}
