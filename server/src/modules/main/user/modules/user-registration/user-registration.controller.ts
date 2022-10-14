import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ChatssyApiTags } from 'src/constant/docs';
import { ChatssyApiQuery } from 'src/decorators/swagger/chatssy-api-query.decorator';
import { UserRegistrationService } from './user-registration.service';
import { RegisterWithEmailReqBody } from './validations/register-with-email';
import { VerifyEmailQuery } from './validations/verify-email';

@ApiTags(ChatssyApiTags.User)
@Controller('users/registration')
export class UserRegistrationController {
  constructor(private service: UserRegistrationService) {}

  @Post('email')
  async registerWithEmail(@Body() { payload }: RegisterWithEmailReqBody) {
    return this.service.registerWithEmail(payload);
  }

  @Get('email/verify')
  @ChatssyApiQuery(VerifyEmailQuery)
  async verifyEmail(
    @Req() req: Request,
    @Query() { user_id, token }: VerifyEmailQuery,
  ) {
    return this.service.verifyEmail(user_id, token);
  }
}
