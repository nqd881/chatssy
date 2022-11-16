import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PipeDiscriminator } from '@pipes/discriminator.pipe';
import { Request } from 'express';
import { ChatssyApiTags } from 'src/constant/docs';
import { DbMessageTypes } from 'src/db-models/message';
import { Session } from 'src/decorators/session.decorator';
import { CookieAuthGuard } from 'src/guards';
import { SessionUserData } from '../session';
import { ChatService } from './chat.service';

import { Converter } from '@automapper/core';
import { MapInterceptor } from '@automapper/nestjs';
import { docToInstance } from '@utils/mongodb';
import { isObjectIdOrHexString, Types } from 'mongoose';
import { DbChat } from 'src/db-models/chat.model';
import { ApiDataChat } from './api/data/chat.data';
import { ApiPayloadCreateChat } from './api/payload/create-chat';
import {
  ApiPayloadCreateDocumentMessage,
  ApiPayloadCreateMessage,
  ApiPayloadCreateTextMessage,
} from './api/payload/create-new-message';
import { ChatIdentificationParam } from './types';

export class ObjectIdToStringConverter
  implements Converter<Types.ObjectId, String>
{
  convert(source: Types.ObjectId) {
    if (isObjectIdOrHexString(source)) return source.toString();
    return null;
  }
}

@ApiTags(ChatssyApiTags.DbChat)
@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @ApiResponse({
    status: 201,
    type: ApiDataChat,
  })
  @Post()
  @UseInterceptors(MapInterceptor(DbChat, ApiDataChat))
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

    return docToInstance(DbChat, newChat);
  }

  @ApiResponse({
    status: 200,
    type: ApiDataChat,
  })
  @Get(':chat_id')
  @UseInterceptors(MapInterceptor(DbChat, ApiDataChat))
  @UseGuards(CookieAuthGuard)
  async getChat(
    @Session('user') user: SessionUserData,
    @Param() { chat_id }: ChatIdentificationParam,
  ) {
    const chat = await this.chatService.getChat(chat_id);

    if (chat.checkIsMember(user.id)) throw new ForbiddenException();
    return docToInstance(DbChat, chat);
  }

  @Get(':chat_id/messages')
  @UseGuards(CookieAuthGuard)
  async getChatMessages(
    @Session('user') user: SessionUserData,
    @Param() { chat_id }: ChatIdentificationParam,
  ) {
    return this.chatService.getChatMessages(chat_id);
  }

  @ApiExtraModels(ApiPayloadCreateTextMessage, ApiPayloadCreateDocumentMessage)
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(ApiPayloadCreateTextMessage) },
        { $ref: getSchemaPath(ApiPayloadCreateDocumentMessage) },
      ],
    },
  })
  @Post(':chat_id/messages')
  @UseGuards(CookieAuthGuard)
  async newMessage(
    @Session('user') user: SessionUserData,
    @Param() { chat_id }: ChatIdentificationParam,
    @Body(
      new PipeDiscriminator({
        discriminatorKey: 'type',
        types: {
          [DbMessageTypes.TEXT]: ApiPayloadCreateTextMessage,
          [DbMessageTypes.DOCUMENT]: ApiPayloadCreateDocumentMessage,
        },
      }),
    )
    payload: ApiPayloadCreateMessage,
  ) {
    return this.chatService.newMessage(chat_id, {
      senderId: user.id,
      ...payload,
    });
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
