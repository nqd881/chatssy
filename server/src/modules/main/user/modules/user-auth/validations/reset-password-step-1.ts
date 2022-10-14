import { ApiProperty } from '@nestjs/swagger';
import { ChatssyReqBody } from '@types';
import { IsEmail } from 'class-validator';
import { ApiNestedValidate } from 'src/decorators/swagger/api-nested-validate.decorator';

export class ResetPasswordStep1Payload {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class ResetPasswordStep1Body extends ChatssyReqBody<ResetPasswordStep1Payload> {
  @ApiNestedValidate(ResetPasswordStep1Payload)
  payload: ResetPasswordStep1Payload;
}
