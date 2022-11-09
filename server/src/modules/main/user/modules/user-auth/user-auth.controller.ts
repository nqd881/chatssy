import { SessionUserData } from '@modules/main/session';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';
import { Session } from 'src/decorators/session.decorator';
import { ApiQueries } from 'src/decorators/swagger/api-queries.decorator';
import { CookieAuthGuard, TfaGuard } from 'src/guards';
import { PasswordChangeDto } from './dto/password-change';
import { PasswordForgotDto } from './dto/password-forgot';
import { PasswordResetDto, PasswordResetQuery } from './dto/password-reset';
import { UserAuthService } from './user-auth.service';

@ApiTags(ChatssyApiTags.User)
@Controller('users/auth')
export class UserAuthController {
  constructor(private service: UserAuthService) {}

  @Post('password_forgot')
  async forgotPassword(@Body() dto: PasswordForgotDto) {
    return this.service.forgotPassword(dto.email);
  }

  @Post('password_reset')
  @ApiQueries(PasswordResetQuery)
  async resetPassword(
    @Query() { user_id, token }: PasswordResetQuery,
    @Body()
    dto: PasswordResetDto,
  ) {
    return this.service.resetPassword(user_id, token, dto.password);
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
    @Body() { password, new_password }: PasswordChangeDto,
  ) {
    return this.service.changePasswordStep2(user.id, password, new_password);
  }
}
