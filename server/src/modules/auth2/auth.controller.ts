import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiDataRegistrationResult } from './api-types/data/registration-result';
import { ApiQueryActivateUserAccount } from './api-types/payload/activate';
import { ApiPayloadRegisterUserAccount } from './api-types/payload/register';
import { ApiParamRegistrationId } from './api-types/registration-id.param';
import { AuthService } from './auth.service';

@Controller('auth2/registrations')
export class AuthRegistrationController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 201,
    type: ApiDataRegistrationResult,
  })
  @Post()
  async registerUserAccount(@Body() payload: ApiPayloadRegisterUserAccount) {
    const registration = await this.authService.registerUserAccount(payload);

    return {
      registrationId: registration?.id ?? null,
    };
  }

  @Get(':registration_id/activate')
  @Redirect()
  async activateUserAccount(
    @Param() { registration_id }: ApiParamRegistrationId,
    @Query()
    {
      code,
      redirect_url_success,
      redirect_url_failure,
    }: ApiQueryActivateUserAccount,
  ) {
    const result = await this.authService.activateUserAccount({
      registrationId: registration_id,
      code,
    });

    return {
      statusCode: 302,
      url: result ? redirect_url_success : redirect_url_failure,
    };
  }

  @ApiResponse({
    status: 200,
    type: ApiDataRegistrationResult,
  })
  @Get(':registration_id/resend')
  async resendActivateEmail(
    @Param() { registration_id }: ApiParamRegistrationId,
  ) {
    const registration = await this.authService.resendRegistrationEmail(
      registration_id,
    );

    return {
      registrationId: registration?.id ?? null,
    };
  }
}

@Controller('auth2/login')
export class AuthLoginController {
  @Post()
  login() {}
}
