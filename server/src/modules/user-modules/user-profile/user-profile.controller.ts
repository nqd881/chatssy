import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';
import { ResourceOwnerID } from 'src/decorators/resource-owner-id.decorator';
import { CookieAuthGuard } from 'src/guards';
import { ResourceOwnerGuard } from 'src/guards/resource-owner.guard';
import { UserParam } from '../types/params';
import { ApiPayloadUpdateUserProfile } from './dto/update-profile';
import { UserProfileService } from './user-profile.service';

@ApiTags(ChatssyApiTags.DbUser)
@Controller('user/:user_id/profile')
@ResourceOwnerID((req) => req.params['user_id'])
export class UserProfileController {
  constructor(private service: UserProfileService) {}

  @Get('basic')
  async getUserProfileBasic(@Param() { user_id }: UserParam) {
    return this.service.getBasicProfile(user_id);
  }

  @Get('details')
  @UseGuards(CookieAuthGuard, ResourceOwnerGuard)
  async getUserProfileDetails(@Param() { user_id }: UserParam) {
    return this.service.getDetailProfile(user_id);
  }

  @Patch()
  @UseGuards(CookieAuthGuard, ResourceOwnerGuard)
  async updateUserProfile(
    @Param() { user_id }: UserParam,
    @Body() payload: ApiPayloadUpdateUserProfile,
  ) {
    return this.service.updateProfile(user_id, payload);
  }

  @Patch('address')
  @UseGuards(CookieAuthGuard)
  async updateUserAddress(
    @Param() { user_id }: UserParam, // @Body()
  ) {}
}
