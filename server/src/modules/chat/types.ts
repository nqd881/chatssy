import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class ChatIdentificationParam {
  @ApiProperty()
  @Expose()
  chat_id: string;
}
