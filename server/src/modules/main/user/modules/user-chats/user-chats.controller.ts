import { UserChatStates } from '@modules/extra/models/user/user-chat.model';
import { SessionUserData } from '@modules/main/session';
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
import { ChatssyApiTags } from 'src/constant/docs';
import { Session } from 'src/decorators/session.decorator';
import { ApiQueries } from 'src/decorators/swagger/api-queries.decorator';
import { CookieAuthGuard } from 'src/guards';
import { UserParam } from '../../types/shared';
import { GetUserChatsQuery } from './dto/get-user-chats';
import { UserChatParam } from './dto/shared';
import { UpdateUserChatDto } from './dto/update-user-chat';
import { UserChatsService } from './user-chats.service';
@ApiTags(ChatssyApiTags.User)
@Controller('users/:user_id/chats')
@UseGuards(CookieAuthGuard)
export class UserChatsController {
  constructor(private service: UserChatsService) {}

  @Get()
  @ApiQueries(GetUserChatsQuery)
  async getAllChats(
    @Session('user') user: SessionUserData,
    @Param() { user_id }: UserParam,
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
    @Session('user') user: SessionUserData,
    @Param() { user_id, chat_id }: UserChatParam,
  ) {
    if (user_id != user.id) throw new ForbiddenException();

    return this.service.getUserChat(user_id, chat_id);
  }

  @Patch(':chat_id')
  async updateChat(
    @Session('user') user: SessionUserData,
    @Param() { user_id, chat_id }: UserChatParam,
    @Body() dto: UpdateUserChatDto,
  ) {
    if (user_id != user.id) throw new ForbiddenException();

    return this.service.updateUserChat(user_id, chat_id, dto);
  }
}
