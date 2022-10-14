import { ApiProperty } from '@nestjs/swagger';
import { ChatssyReqBody } from '@types';
import { ApiNestedValidate } from 'src/decorators/swagger/api-nested-validate.decorator';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';
import { Match } from 'src/decorators/validator/match.decorator';
import { Password } from 'src/decorators/validator/password';

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

export class ResetPasswordStep2Body extends ChatssyReqBody<ResetPasswordStep2Payload> {
  @ApiNestedValidate(ResetPasswordStep2Payload)
  payload: ResetPasswordStep2Payload;
}
