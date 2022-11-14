import { SessionUserData } from '@modules/session';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';
import { Session } from 'src/decorators/session.decorator';
import { ApiQueries } from 'src/decorators/swagger/api-queries.decorator';
import { CookieAuthGuard, TfaGuard } from 'src/guards';
import { ApiPayloadChangePassword } from './api/change-password';
import { ApiPayloadForgotPassword } from './api/forgot-password';
import {
  ApiPayloadResetPassword,
  ApiQueryResetPassword,
} from './api/reset-password';
import { UserAuthService } from './user-auth.service';

@ApiTags(ChatssyApiTags.DbUser)
@Controller('user/auth')
export class UserAuthController {
  constructor(private service: UserAuthService) {}

  @Post('password_forgot')
  async forgotPassword(@Body() payload: ApiPayloadForgotPassword) {
    return this.service.forgotPassword(payload.email);
  }

  @Post('password_reset')
  @ApiQueries(ApiQueryResetPassword)
  async resetPassword(
    @Query() { user_id, token }: ApiQueryResetPassword,
    @Body()
    payload: ApiPayloadResetPassword,
  ) {
    return this.service.resetPassword(user_id, token, payload.password);
  }

  @Get('password_change')
  @UseGuards(CookieAuthGuard)
  async changePasswordStep1(@Session('user') user: SessionUserData) {
    return this.service.changePasswordStep1(user.email);
  }

  @Post('password_change')
  @UseGuards(CookieAuthGuard, TfaGuard)
  async changePasswordStep2(
    @Session('user') user: SessionUserData,
    @Body() { password, newPassword }: ApiPayloadChangePassword,
  ) {
    return this.service.changePasswordStep2(user.id, password, newPassword);
  }
}
