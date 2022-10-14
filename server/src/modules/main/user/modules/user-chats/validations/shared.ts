import { UserIdentificationParam } from '@modules/main/user/types/shared';
import { ApiProperty } from '@nestjs/swagger';

export class UserChatIdentificationParam extends UserIdentificationParam {
  @ApiProperty()
  chat_id: string;
}
