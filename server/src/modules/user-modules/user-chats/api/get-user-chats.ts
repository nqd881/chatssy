import { DbUserChatStates } from 'src/db-models/user/user-chat.model';
import { IsEnum, IsOptional } from 'class-validator';
import { QueryArrayTransform } from 'src/decorators/query-array-transform.decorator';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';

export class ApiQueryGetUserChats {
  @ApiQueryProperty({
    required: false,
    isArray: true,
    enum: DbUserChatStates,
  })
  @IsEnum(DbUserChatStates, { each: true })
  @QueryArrayTransform()
  @IsOptional()
  states?: DbUserChatStates[];

  @ApiQueryProperty({
    required: false,
    isArray: true,
  })
  @QueryArrayTransform()
  @IsOptional()
  ids?: string[];
}
