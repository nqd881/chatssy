import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
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

import { ApiPayloadCreateChat } from './api/create-chat';
import {
  ApiPayloadCreateDocumentMessage,
  ApiPayloadCreateMessageBase,
  ApiPayloadCreateTextMessage,
} from './api/create-new-message';
import { ChatIdentificationParam } from './types';
import { isObjectIdOrHexString } from 'mongoose';

@ApiTags(ChatssyApiTags.DbChat)
@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
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

  @Get(':chat_id')
  @UseGuards(CookieAuthGuard)
  async getChat(
    @Session('user') user: SessionUserData,
    @Param() { chat_id }: ChatIdentificationParam,
  ) {
    return this.chatService.getChat(user.id, chat_id);
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
    payload: ApiPayloadCreateMessageBase,
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
