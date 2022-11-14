import { UserParam } from '@modules/user-modules/types/params';
import { ApiProperty } from '@nestjs/swagger';

export class UserChatParam extends UserParam {
  @ApiProperty()
  chat_id: string;
}
