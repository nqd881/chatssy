import { UserChatStates } from '@modules/extra/models/user/user-chat.model';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionUser } from 'express-session';
import { ChatssyApiTags } from 'src/constant/docs';
import { Session } from 'src/decorators/session.decorator';
import { ChatssyApiQuery } from 'src/decorators/swagger/chatssy-api-query.decorator';
import { AuthGuard } from 'src/guards';
import { UserIdentificationParam } from '../../types/shared';
import { UserChatsService } from './user-chats.service';
import { GetUserChatsQuery } from './validations/get-user-chats';
import { UserChatIdentificationParam } from './validations/shared';
import { UpdateUserChatReqBody } from './validations/update-user-chat';
@ApiTags(ChatssyApiTags.User)
@Controller('users/:user_id/chats')
@UseGuards(AuthGuard)
export class UserChatsController {
  constructor(private service: UserChatsService) {}

  @Get()
  @ChatssyApiQuery(GetUserChatsQuery)
  async getAllChats(
    @Session('user') user: SessionUser,
    @Param() { user_id }: UserIdentificationParam,
    @Query() query: GetUserChatsQuery,
  ) {
    if (user_id != user.id) throw new ForbiddenException();

    const options = {
      ...query,
      states: query.states ?? [UserChatStates.STARTED],
    };

    return this.service.getUserChats(user_id, options);
  }

  @Get(':chat_id')
  async getOneChat(
    @Session('user') user: SessionUser,
    @Param() { user_id, chat_id }: UserChatIdentificationParam,
  ) {
    if (user_id != user.id) throw new ForbiddenException();

    return this.service.getUserChat(user_id, chat_id);
  }

  @Patch(':chat_id')
  async updateChat(
    @Session('user') user: SessionUser,
    @Param() { user_id, chat_id }: UserChatIdentificationParam,
    @Body() { payload }: UpdateUserChatReqBody,
  ) {
    if (user_id != user.id) throw new ForbiddenException();

    return this.service.updateUserChat(user_id, chat_id, payload);
  }
}
