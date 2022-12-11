import { SessionUserData } from '@modules/session';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';
import { Session } from 'src/decorators/session.decorator';
import { ApiQueries } from 'src/decorators/swagger/api-queries.decorator';
import { ApiPayloadRegisterWithEmail } from './api/payload/register';
import { ApiQueryVerifyEmail } from './api/payload/verify-email';
import { UserService } from './user.service';

@ApiTags(ChatssyApiTags.DbUser)
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('registration/email')
  async register(@Body() payload: ApiPayloadRegisterWithEmail) {
    return this.service.registerWithEmail(payload);
  }

  @Get('registration/email')
  @ApiQueries(ApiQueryVerifyEmail)
  async verifyEmail(@Query() { user_id, token }: ApiQueryVerifyEmail) {
    return this.service.verifyMainEmail(user_id, token);
  }

  @Get('')
  getFullUserInfo(@Session('user') user: SessionUserData) {
    return this.service.getFullUserInfo(user.id);
  }
}
