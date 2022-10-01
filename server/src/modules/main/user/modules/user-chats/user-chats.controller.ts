import { UserChatStates } from '@modules/extra/database/schemas';
import {
  Body,
  Controller,
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
import {
  GetAllChatsQuery,
  UpdateUserChatReqBody,
  UserChatIdentificationParam,
} from './validations';

@ApiTags(ChatssyApiTags.User)
@Controller('user/:user_id/chats')
export class UserChatsController {
  constructor(private service: UserChatsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ChatssyApiQuery(GetAllChatsQuery)
  async getAllUserChats(
    @Session('user') user: SessionUser,
    @Param() { user_id }: UserIdentificationParam,
    @Query() query: GetAllChatsQuery,
  ) {
    if (user_id != user.id) return null;
    const options = {
      ...query,
      states: query.states ?? [UserChatStates.STARTED],
    };

    return this.service.getUserChats(user_id, options);
  }

  @Get(':chat_id')
  @UseGuards(AuthGuard)
  async getUserChat(
    @Session('user') user: SessionUser,
    @Param() { user_id, chat_id }: UserChatIdentificationParam,
  ) {
    if (user_id != user.id) return null;

    return this.service.getUserChat(user_id, chat_id);
  }

  @Patch(':chat_id')
  @UseGuards(AuthGuard)
  async updateUserChat(
    @Session('user') user: SessionUser,
    @Param() { user_id, chat_id }: UserChatIdentificationParam,
    @Body() { payload }: UpdateUserChatReqBody,
  ) {
    if (user_id != user.id) return null;

    return this.service.updateUserChat(user_id, chat_id, payload);
  }
}
