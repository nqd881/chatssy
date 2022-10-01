import { User, UserModel } from '@modules/extra/database/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IdFilter } from '../../mongoose-query/filter/id';
import { UpdateProfileQuery } from '../../mongoose-query/update/profile';
import { UserSearchingService } from '../user-searching/user-searching.service';
import { UpdateUserProfileData } from './data-types';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(User.name) private model: UserModel,
    private searchingService: UserSearchingService,
  ) {}

  async getProfile(user_id: string) {
    const user = await this.searchingService.findById(user_id);
    return user.profile;
  }

  async updateProfile(user_id: string, data: UpdateUserProfileData) {
    const user = await this.model.findOneAndUpdate(
      IdFilter(user_id),
      UpdateProfileQuery(data),
      { new: true },
    );

    return user.profile;
  }
}
