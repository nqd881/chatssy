import { MessageTypes } from '@modules/extra/models/message';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsType } from 'src/decorators/validator/is-type.decorator';

export interface CreateMessageDtoBase {
  type: MessageTypes;
  content: any;
}

export class CreateTextMessageContentDto {
  @ApiProperty()
  @IsString()
  text: string;
}

export class CreateTextMessageDto implements CreateMessageDtoBase {
  @ApiProperty()
  @IsString()
  type: MessageTypes.TEXT;

  @ApiProperty()
  @IsType(CreateTextMessageContentDto)
  @IsNotEmpty()
  content: CreateTextMessageContentDto;
}

export class CreateDocumentMessageContentDto {
  @ApiProperty()
  @IsString()
  file_name: string;

  @ApiProperty()
  @IsString()
  mime_type: string;
}

export class CreateDocumentMessageDto implements CreateMessageDtoBase {
  @ApiProperty()
  @IsString()
  type: MessageTypes.DOCUMENT;

  @ApiProperty()
  @IsType(CreateDocumentMessageContentDto)
  @IsNotEmpty()
  content: CreateDocumentMessageContentDto;
}

export type CreateMessageDto = CreateTextMessageDto | CreateDocumentMessageDto;
