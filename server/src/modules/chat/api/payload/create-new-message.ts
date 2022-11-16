import { DbMessageTypes } from 'src/db-models/message';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsType } from 'src/decorators/validator/is-type.decorator';

export interface ApiPayloadCreateMessageBase {
  type: DbMessageTypes;
  content: any;
}

export class ApiPayloadCreateTextMessageContent {
  @ApiProperty()
  @IsString()
  text: string;
}

export class ApiPayloadCreateTextMessage
  implements ApiPayloadCreateMessageBase
{
  @ApiProperty()
  @IsString()
  type: DbMessageTypes.TEXT;

  @ApiProperty()
  @IsType(ApiPayloadCreateTextMessageContent)
  @IsNotEmpty()
  content: ApiPayloadCreateTextMessageContent;
}

export class ApiPayloadCreateDocumentMessageContent {
  @ApiProperty()
  @IsString()
  fileName: string;

  @ApiProperty()
  @IsString()
  mimeType: string;
}

export class ApiPayloadCreateDocumentMessage
  implements ApiPayloadCreateMessageBase
{
  @ApiProperty()
  @IsString()
  type: DbMessageTypes.DOCUMENT;

  @ApiProperty()
  @IsType(ApiPayloadCreateDocumentMessageContent)
  @IsNotEmpty()
  content: ApiPayloadCreateDocumentMessageContent;
}

export type ApiPayloadCreateMessage =
  | ApiPayloadCreateTextMessage
  | ApiPayloadCreateDocumentMessage;
