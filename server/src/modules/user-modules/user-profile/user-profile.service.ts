import {
  DbUserProfile,
  DbUserProfileModel,
} from 'src/db-models/user/user-profile.model';
import { Injectable } from '@nestjs/common';
import { flattenToDotObject } from '@utils';
import { InjectModel } from 'nestgoose';
import { UpdateUserProfileData } from './data-types';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(DbUserProfile) private userProfileModel: DbUserProfileModel,
  ) {}

  async fetchUserProfile(userId: string) {
    return this.userProfileModel.findOne({ userId });
  }

  async getBasicProfile(userId: string) {
    const { firstName, lastName, photo } = await this.fetchUserProfile(userId);

    return {
      firstName,
      lastName,
      photo,
    };
  }

  async getDetailProfile(userID: string) {
    const userProfile = await this.fetchUserProfile(userID);

    return userProfile;
  }

  async updateProfile(userId: string, data: UpdateUserProfileData) {
    const updateQuery = flattenToDotObject(data);

    const userProfile = await this.userProfileModel.findOneAndUpdate(
      { userId },
      updateQuery,
      { new: true },
    );

    return userProfile;
  }
}
