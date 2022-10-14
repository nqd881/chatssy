import { UserChatStates } from '@modules/extra/models/user/user-chat.model';
import { ApiProperty } from '@nestjs/swagger';
import { ChatssyReqBody } from '@types';
import { IsEnum, IsString } from 'class-validator';
import { ApiNestedValidate } from 'src/decorators/swagger/api-nested-validate.decorator';

export class UpdateUserChatPayload {
  @ApiProperty({ enum: UserChatStates })
  @IsEnum(UserChatStates)
  @IsString()
  state: UserChatStates;
}

export class UpdateUserChatReqBody extends ChatssyReqBody {
  @ApiNestedValidate(UpdateUserChatPayload)
  payload: UpdateUserChatPayload;
}
