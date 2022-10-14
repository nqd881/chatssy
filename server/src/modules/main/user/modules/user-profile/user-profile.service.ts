import { User, UserModel } from '@modules/extra/models/user/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestgoose';
import { flattenToDotObject } from '@modules/utils';
import { UserSearchingService } from '../user-searching/user-searching.service';
import { UpdateUserProfileData } from './data-types';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(User) private model: UserModel,
    private searchingService: UserSearchingService,
  ) {}

  async getProfile(user_id: string) {
    const user = await this.searchingService.findById(user_id);
    return user.profile;
  }

  async updateProfile(userId: string, data: UpdateUserProfileData) {
    const updateQuery = flattenToDotObject(
      {
        profile: data,
      },
      { ignoreUndefined: true },
    );

    const user = await this.model.findByIdAndUpdate(userId, updateQuery, {
      new: true,
    });

    return user.profile;
  }
}
