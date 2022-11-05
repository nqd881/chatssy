import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';
import { CookieAuthGuard } from 'src/guards';
import { UserParam } from '../../types/shared';
import { UpdateUserProfileDto } from './dto/update-profile';
import { UserProfileService } from './user-profile.service';

@ApiTags(ChatssyApiTags.User)
@Controller('users/:user_id/profile')
export class UserProfileController {
  constructor(private service: UserProfileService) {}

  @Get()
  @UseGuards(CookieAuthGuard)
  async getUserProfile(@Param() { user_id }: UserParam) {
    return this.service.getProfile(user_id);
  }

  @Patch()
  async updateUserProfile(
    @Param() { user_id }: UserParam,
    @Body() dto: UpdateUserProfileDto,
  ) {
    return this.service.updateProfile(user_id, dto);
  }
}
