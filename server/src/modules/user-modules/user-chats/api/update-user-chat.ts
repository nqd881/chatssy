import { DbUserChatStates } from 'src/db-models/user/user-chat.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class UpdateUserChatDto {
  @ApiProperty({ enum: DbUserChatStates })
  @IsEnum(DbUserChatStates)
  @IsString()
  state: DbUserChatStates;
}
