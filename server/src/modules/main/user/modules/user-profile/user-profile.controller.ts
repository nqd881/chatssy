import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';
import { AuthGuard } from 'src/guards';
import { UserIdentificationParam } from '../../types/shared';
import { UserProfileService } from './user-profile.service';
import { UpdateUserProfileReqBody } from './validations';

@ApiTags(ChatssyApiTags.User)
@Controller('users/:user_id/profile')
export class UserProfileController {
  constructor(private service: UserProfileService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUserProfile(@Param() { user_id }: UserIdentificationParam) {
    return this.service.getProfile(user_id);
  }

  @Patch()
  async updateUserProfile(
    @Param() { user_id }: UserIdentificationParam,
    @Body() { payload }: UpdateUserProfileReqBody,
  ) {
    return this.service.updateProfile(user_id, payload);
  }
}
