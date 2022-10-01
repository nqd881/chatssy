import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Password } from 'src/decorators/validator/password';
import { ChatssyReqBody } from 'src/types';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';
import { UserIdentificationParam } from '../../types/shared';

export class RegisterBasePayload {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsDateString()
  birth_date: Date;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @Password()
  @IsString()
  password: string;
}

export class RegisterWithEmailPayload extends RegisterBasePayload {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class RegisterWithPhonePayload extends RegisterBasePayload {
  @ApiProperty()
  @IsPhoneNumber('VN')
  phone: string;
}

export class RegisterWithEmailReqBody extends ChatssyReqBody<RegisterWithEmailPayload> {
  @ApiProperty()
  @ValidateNested()
  @Type(() => RegisterWithEmailPayload)
  payload: RegisterWithEmailPayload;
}

export class RegisterWithPhoneReqBody extends ChatssyReqBody<RegisterWithPhonePayload> {
  @ApiProperty()
  @ValidateNested()
  @Type(() => RegisterWithPhonePayload)
  payload: RegisterWithPhonePayload;
}

export class VerifyEmailQuery extends UserIdentificationParam {
  @ApiQueryProperty()
  token: string;
}

export class VerifyEmailPayload {
  @ApiProperty()
  @IsString()
  code: string;
}

export class VerifyEmailReqBody extends ChatssyReqBody<VerifyEmailPayload> {
  @ApiProperty()
  @ValidateNested()
  @Type(() => VerifyEmailPayload)
  payload: VerifyEmailPayload;
}
