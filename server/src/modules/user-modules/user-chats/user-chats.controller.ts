import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';
import { ResourceOwnerID } from 'src/decorators/resource-owner-id.decorator';
import { CookieAuthGuard } from 'src/guards';
import { ResourceOwnerGuard } from 'src/guards/resource-owner.guard';
import { UserParam } from '../types/params';
import { UserChatsService } from './user-chats.service';

@ApiTags(ChatssyApiTags.DbUser)
@Controller('user/:user_id/chats')
@ResourceOwnerID((req) => req.params['user_id'])
// @UseInterceptors(ClassSerializerInterceptor)
@UseGuards(CookieAuthGuard)
export class UserChatsController {
  constructor(private service: UserChatsService) {}

  @Get()
  @UseGuards(ResourceOwnerGuard)
  async getAllChats(@Param() { user_id }: UserParam) {
    return this.service.getAllUserChats(user_id);
  }

  // @Get(':chat_id')
  // async getOneChat(@Param() { user_id, chat_id }: UserChatParam) {
  //   return this.service.getUserChat(user_id, chat_id);
  // }

  // @Patch(':chat_id')
  // async updateChat(
  //   @Param() { user_id, chat_id }: UserChatParam,
  //   @Body() dto: UpdateUserChatDto,
  // ) {
  //   return this.service.updateUserChat(user_id, chat_id, dto);
  // }
}
