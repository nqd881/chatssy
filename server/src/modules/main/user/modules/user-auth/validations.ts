import { ApiProperty } from '@nestjs/swagger';
import { ChatssyReqBody } from '@types';
import { Type } from 'class-transformer';
import { IsEmail, ValidateNested } from 'class-validator';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';
import { Match } from 'src/decorators/validator/match.decorator';
import { Password } from 'src/decorators/validator/password';

export class ResetPasswordStep1Payload {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class ResetPasswordStep2Payload {
  @ApiProperty()
  @Password()
  password: string;

  @ApiProperty()
  @Match('password')
  confirm_password: string;
}

export class ResetPasswordStep2Query {
  @ApiQueryProperty()
  user_id: string;

  @ApiQueryProperty()
  token: string;
}

export class ResetPasswordStep1Body extends ChatssyReqBody<ResetPasswordStep1Payload> {
  @ApiProperty()
  @ValidateNested()
  @Type(() => ResetPasswordStep1Payload)
  payload: ResetPasswordStep1Payload;
}

export class ResetPasswordStep2Body extends ChatssyReqBody<ResetPasswordStep2Payload> {
  @ApiProperty()
  @ValidateNested()
  @Type(() => ResetPasswordStep2Payload)
  payload: ResetPasswordStep2Payload;
}
