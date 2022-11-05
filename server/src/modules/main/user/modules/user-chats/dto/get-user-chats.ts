import { UserChatStates } from '@modules/extra/models/user/user-chat.model';
import { IsEnum, IsOptional } from 'class-validator';
import { QueryArrayTransform } from 'src/decorators/query-array-transform.decorator';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';

export class GetUserChatsQuery {
  @ApiQueryProperty({
    required: false,
    isArray: true,
    enum: UserChatStates,
  })
  @IsEnum(UserChatStates, { each: true })
  @QueryArrayTransform()
  @IsOptional()
  states?: UserChatStates[];

  @ApiQueryProperty({
    required: false,
    isArray: true,
  })
  @QueryArrayTransform()
  @IsOptional()
  ids?: string[];
}
