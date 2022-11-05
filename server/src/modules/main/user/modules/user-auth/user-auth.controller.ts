import { SessionUserData } from '@modules/main/session';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';
import { Session } from 'src/decorators/session.decorator';
import { ApiQueries } from 'src/decorators/swagger/api-queries.decorator';
import { CookieAuthGuard, TfaGuard } from 'src/guards';
import { PasswordChangeDto } from './dto/password-change';
import { PasswordReset1Dto } from './dto/password-reset-1';
import { PasswordReset2Dto, PasswordReset2Query } from './dto/password-reset-2';
import { UserAuthService } from './user-auth.service';

@ApiTags(ChatssyApiTags.User)
@Controller('users/auth')
export class UserAuthController {
  constructor(private service: UserAuthService) {}

  @Post('password_reset/step1')
  async resetPasswordStep1(@Body() dto: PasswordReset1Dto) {
    return this.service.resetPasswordStep1(dto.email);
  }

  @Post('password_reset/step2')
  @ApiQueries(PasswordReset2Query)
  async resetPasswordStep2(
    @Query() { user_id, token }: PasswordReset2Query,
    @Body()
    dto: PasswordReset2Dto,
  ) {
    return this.service.resetPasswordStep2(user_id, token, dto.password);
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
