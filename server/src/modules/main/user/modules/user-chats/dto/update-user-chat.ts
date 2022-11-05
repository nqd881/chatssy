import { UserChatStates } from '@modules/extra/models/user/user-chat.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class UpdateUserChatDto {
  @ApiProperty({ enum: UserChatStates })
  @IsEnum(UserChatStates)
  @IsString()
  state: UserChatStates;
}
