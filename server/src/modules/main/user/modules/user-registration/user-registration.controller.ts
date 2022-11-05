import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ChatssyApiTags } from 'src/constant/docs';
import { ApiQueries } from 'src/decorators/swagger/api-queries.decorator';
import { RegisterDto } from './dto/register';
import { VerifyEmailQuery } from './dto/verify-email';
import { UserRegistrationService } from './user-registration.service';

@ApiTags(ChatssyApiTags.User)
@Controller('users/registration')
export class UserRegistrationController {
  constructor(private service: UserRegistrationService) {}

  @Post('email')
  async register(@Body() dto: RegisterDto) {
    return this.service.register(dto);
  }

  @Get('email')
  @ApiQueries(VerifyEmailQuery)
  async verifyEmail(
    @Req() req: Request,
    @Query() { user_id, token }: VerifyEmailQuery,
  ) {
    return this.service.verifyEmail(user_id, token);
  }
}
