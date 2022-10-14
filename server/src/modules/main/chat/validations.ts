import { ApiProperty } from '@nestjs/swagger';
import { ChatssyReqBody } from '@types';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateNewChatPayload {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  members: string[];
}

export class CreateNewChatReqBody extends ChatssyReqBody<CreateNewChatPayload> {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateNewChatPayload)
  payload: CreateNewChatPayload;
}
