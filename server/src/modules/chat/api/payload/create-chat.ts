import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsString,
} from 'class-validator';

export class ApiPayloadCreateChat {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsMongoId({ each: true, message: 'Invalid id' })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  memberIds: string[];
}
