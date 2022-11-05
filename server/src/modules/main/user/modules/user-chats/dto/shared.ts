import { UserParam } from '@modules/main/user/types/shared';
import { ApiProperty } from '@nestjs/swagger';

export class UserChatParam extends UserParam {
  @ApiProperty()
  chat_id: string;
}
