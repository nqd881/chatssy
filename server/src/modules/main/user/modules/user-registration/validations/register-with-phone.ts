import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';
import { ApiNestedValidate } from 'src/decorators/swagger/api-nested-validate.decorator';
import { ChatssyReqBody } from 'src/types';
import { RegisterBasePayload } from './register-base.payload';

export class RegisterWithPhonePayload extends RegisterBasePayload {
  @ApiProperty()
  @IsPhoneNumber('VN')
  phone: string;
}

export class RegisterWithPhoneReqBody extends ChatssyReqBody<RegisterWithPhonePayload> {
  @ApiNestedValidate(RegisterWithPhonePayload)
  payload: RegisterWithPhonePayload;
}
