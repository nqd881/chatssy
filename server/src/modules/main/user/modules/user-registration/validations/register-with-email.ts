import { ApiProperty } from '@nestjs/swagger';
import { ChatssyReqBody } from '@types';
import { IsEmail } from 'class-validator';
import { ApiNestedValidate } from 'src/decorators/swagger/api-nested-validate.decorator';
import { RegisterBasePayload } from './register-base.payload';

export class RegisterWithEmailPayload extends RegisterBasePayload {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class RegisterWithEmailReqBody extends ChatssyReqBody<RegisterWithEmailPayload> {
  @ApiNestedValidate(RegisterWithEmailPayload)
  payload: RegisterWithEmailPayload;
}
