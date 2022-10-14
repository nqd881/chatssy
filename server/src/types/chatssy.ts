import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { ApiNestedValidate } from 'src/decorators/swagger/api-nested-validate.decorator';

export enum TfaCodeTypes {
  VERIFICATION_CODE = 'verification_code',
  TOTP = 'totp',
  BACKUP_CODE = 'backup_code',
}

export class TfaPayload {
  @ApiProperty({ enum: Object.values(TfaCodeTypes) })
  @IsEnum(TfaCodeTypes)
  @IsString()
  type: TfaCodeTypes;

  @ApiProperty()
  @IsString()
  code: string;
}

export interface ChatssyResBody<Data = any> {
  data: Data;
  error?: any[];
}

export abstract class ChatssyReqBody<Payload = any> {
  abstract payload: Payload;

  @ApiNestedValidate(TfaPayload, {
    apiPropertyOptions: {
      required: false,
    },
  })
  tfa?: TfaPayload;
}

export interface ChatssyReq<
  ReqPayload = any,
  ResData = any,
  P = core.ParamsDictionary,
  ResQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>,
> extends Request<
    P,
    ChatssyReqBody<ReqPayload>,
    ChatssyResBody<ResData>,
    ResQuery,
    Locals
  > {}

export interface ChatssyRes<
  ResData = any,
  Locals extends Record<string, any> = Record<string, any>,
> extends Response<ChatssyResBody<ResData>, Locals> {}
