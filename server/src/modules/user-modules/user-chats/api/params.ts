import { ApiParamUser } from '@modules/user-modules/types/params';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiParamUserChat extends ApiParamUser {
  @ApiProperty()
  @Expose()
  chat_id: string;
}
