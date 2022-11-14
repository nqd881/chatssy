import { ApiProperty } from '@nestjs/swagger';

export class ChatIdentificationParam {
  @ApiProperty()
  chat_id: string;
}
