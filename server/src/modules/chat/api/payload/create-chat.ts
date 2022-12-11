import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
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
  @Expose()
  title: string;

  @ApiProperty()
  @IsMongoId({ each: true, message: 'Invalid id' })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @Expose()
  memberIds: string[];
}
