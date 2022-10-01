import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';
import { ChatssyApiQuery } from 'src/decorators/swagger/chatssy-api-query.decorator';
import { RegisterWithEmailReqBody, VerifyEmailQuery } from './validations';
import { UserRegistrationService } from './user-registration.service';

@ApiTags(ChatssyApiTags.User)
@Controller('user/registration')
export class UserRegistrationController {
  constructor(private service: UserRegistrationService) {}

  @Post('email')
  async registerWithEmail(@Body() { payload }: RegisterWithEmailReqBody) {
    return this.service.registerWithEmail(payload);
  }

  @Get('email')
  @ChatssyApiQuery(VerifyEmailQuery)
  async verifyEmail(@Query() { user_id, token }: VerifyEmailQuery) {
    return this.service.verifyEmail(user_id, token);
  }
}
