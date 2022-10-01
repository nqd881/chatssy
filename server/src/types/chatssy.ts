import { TfaPayload } from '@modules/main/tfa_process/types2';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';

export interface ChatssyResBody<Data = any> {
  data: Data;
  error?: any[];
}

export abstract class ChatssyReqBody<Payload = any> {
  abstract payload: Payload;

  @ApiPropertyOptional({ type: TfaPayload })
  @ValidateNested()
  @Type(() => TfaPayload)
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
