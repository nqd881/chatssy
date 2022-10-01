import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';
import { ChatssyApiQuery } from 'src/decorators/swagger/chatssy-api-query.decorator';
import {
  ResetPasswordStep1Body,
  ResetPasswordStep2Body,
  ResetPasswordStep2Query,
} from './validations';
import { UserAuthService } from './user-auth.service';

@ApiTags(ChatssyApiTags.User)
@Controller('user/auth')
export class UserAuthController {
  constructor(private service: UserAuthService) {}

  @Post('password_reset/step1')
  async resetPasswordStep1(
    @Body()
    { payload }: ResetPasswordStep1Body,
  ) {
    this.service.resetPassword1(payload.email);
    return null;
  }

  @Post('password_reset/step2')
  @ChatssyApiQuery(ResetPasswordStep2Query)
  async resetPasswordStep2(
    @Query() { user_id, token }: ResetPasswordStep2Query,
    @Body()
    { payload }: ResetPasswordStep2Body,
  ) {
    return this.service.resetPassword2(user_id, token, payload.password);
  }
}
