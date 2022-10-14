import { UserIdentificationParam } from '@modules/main/user/types/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ApiNestedValidate } from 'src/decorators/swagger/api-nested-validate.decorator';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';
import { ChatssyReqBody } from 'src/types';

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
  @ApiNestedValidate(VerifyEmailPayload)
  payload: VerifyEmailPayload;
}
