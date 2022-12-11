import { DbUserChatStates } from 'src/db-models/user/user-chat.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ApiPayloadUpdateUserChat {
  @ApiProperty({ enum: DbUserChatStates })
  @IsEnum(DbUserChatStates)
  @IsString()
  @Expose()
  state: DbUserChatStates;
}
