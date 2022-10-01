import { UserChatStates } from '@modules/extra/database/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { ChatssyReqBody } from '@types';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { QueryArrayTransform } from 'src/decorators/query-array-transform.decorator';
import { ApiQueryProperty } from 'src/decorators/swagger/api-query-property.decorator';
import { UserIdentificationParam } from '../../types/shared';

export class GetAllChatsQuery {
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

export class UserChatIdentificationParam extends UserIdentificationParam {
  @ApiProperty()
  chat_id: string;
}

export class UpdateUserChatPayload {
  @ApiProperty({ enum: UserChatStates })
  @IsEnum(UserChatStates)
  @IsString()
  state: UserChatStates;
}

export class UpdateUserChatReqBody extends ChatssyReqBody<UpdateUserChatPayload> {
  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateUserChatPayload)
  payload: UpdateUserChatPayload;
}
