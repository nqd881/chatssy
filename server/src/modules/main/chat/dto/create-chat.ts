import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsString
} from 'class-validator';

export class CreateChatDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  members: string[];
}
