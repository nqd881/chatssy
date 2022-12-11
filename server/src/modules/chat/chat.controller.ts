import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ChatssyApiTags } from 'src/constant/docs';
import { Session } from 'src/decorators/session.decorator';
import { CookieAuthGuard } from 'src/guards';
import { SessionUserData } from '../session';
import { ChatService } from './chat.service';

import { MongoSerializeInterceptor } from '@interceptors/mongo-serialize.interceptor';
import { isObjectIdOrHexString } from 'mongoose';
import { ApiDataChat } from './api/data/chat.data';
import {
  ApiDataMessage,
  API_DATA_MESSAGE_CONTENT_MAP,
} from './api/data/message.data';
import { ApiPayloadCreateChat } from './api/payload/create-chat';
import {
  ApiPayloadCreateMessage,
  API_PAYLOAD_CREATE_MESSAGE_CONTENT_MAP,
} from './api/payload/create-new-message';
import { ChatIdentificationParam } from './types';

@ApiTags(ChatssyApiTags.DbChat)
@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @ApiResponse({
    status: 201,
    type: ApiDataChat,
  })
  @Post()
  @UseInterceptors(ClassSerializerInterceptor, MongoSerializeInterceptor)
  @SerializeOptions({ type: ApiDataChat })
  @UseGuards(CookieAuthGuard)
  async createChat(
    @Session('user') user: SessionUserData,
    @Body() payload: ApiPayloadCreateChat,
  ) {
    const creatorId = user.id;
    const memberIds = [...new Set([...payload.memberIds, creatorId])].filter(
      (memberId) => isObjectIdOrHexString(memberId),
    );

    const newChat = await this.chatService.create({
      title: payload.title,
      creatorId,
      memberIds,
    });

    return newChat;
  }

  @ApiResponse({
    status: 200,
    type: ApiDataChat,
  })
  @Get(':chat_id')
  @UseInterceptors(ClassSerializerInterceptor, MongoSerializeInterceptor)
  @SerializeOptions({ type: ApiDataChat })
  @UseGuards(CookieAuthGuard)
  async getChat(
    @Session('user') user: SessionUserData,
    @Param() { chat_id }: ChatIdentificationParam,
  ) {
    const chat = await this.chatService.getChat(chat_id);

    if (chat.checkIsMember(user.id)) throw new ForbiddenException();

    return chat;
  }

  @Get(':chat_id/messages')
  @UseGuards(CookieAuthGuard)
  async getChatMessages(
    @Session('user') user: SessionUserData,
    @Param() { chat_id }: ChatIdentificationParam,
  ) {
    return this.chatService.getChatMessages(chat_id);
  }

  @ApiExtraModels(...Object.values(API_PAYLOAD_CREATE_MESSAGE_CONTENT_MAP))
  @ApiExtraModels(...Object.values(API_DATA_MESSAGE_CONTENT_MAP))
  @ApiResponse({
    status: 201,
    type: ApiDataMessage,
  })
  @UseInterceptors(ClassSerializerInterceptor, MongoSerializeInterceptor)
  @SerializeOptions({ type: ApiDataMessage })
  @UseGuards(CookieAuthGuard)
  @Post(':chat_id/messages')
  async newMessage(
    @Session('user') user: SessionUserData,
    @Param() { chat_id }: ChatIdentificationParam,
    @Body() payload: ApiPayloadCreateMessage,
  ) {
    const newMessage = await this.chatService.newMessage(chat_id, {
      senderId: user.id,
      ...payload,
    });

    return newMessage;
  }

  @Patch(':chat_id/members/:member_id')
  @UseGuards(CookieAuthGuard)
  async updateChatMember(
    @Req() req: Request,
    @Param() { chat_id }: ChatIdentificationParam,
  ) {
    return null;
  }
}
