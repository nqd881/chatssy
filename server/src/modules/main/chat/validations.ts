import { ApiProperty } from '@nestjs/swagger';
import { ChatssyReqBody } from '@types';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateNewChatPayload {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  private: boolean;

  @ApiProperty()
  @IsUrl()
  avatar_url: string;

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
