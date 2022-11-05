import { MessageTypes } from '@modules/extra/models/message';
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
import { Session } from 'src/decorators/session.decorator';
import { CookieAuthGuard } from 'src/guards';
import { MessageService } from '../message';
import { SessionUserData } from '../session';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat';
import {
  CreateDocumentMessageDto,
  CreateMessageDto,
  CreateTextMessageDto,
} from './dto/create-new-message';
import { ChatIdentificationParam } from './types';

@ApiTags(ChatssyApiTags.Chat)
@Controller('chats')
export class ChatController {
  constructor(private service: ChatService) {}

  @Post()
  @UseGuards(CookieAuthGuard)
  async newChat(
    @Session('user') user: SessionUserData,
    @Body() dto: CreateChatDto,
  ) {
    const creator_id = user.id;
    const members = [...new Set([...dto.members, creator_id])];

    return this.service.create({
      ...dto,
      creator_id,
      members,
    });
  }

  @Get(':chat_id')
  @UseGuards(CookieAuthGuard)
  async getChat(
    @Session('user') user: SessionUserData,
    @Param() { chat_id }: ChatIdentificationParam,
  ) {
    return this.service.getChat(user.id, chat_id);
  }

  @Get(':chat_id/messages')
  @UseGuards(CookieAuthGuard)
  async getChatMessages(
    @Session('user') user: SessionUserData,
    @Param() { chat_id }: ChatIdentificationParam,
  ) {
    return this.service.getChatMessages(chat_id);
  }

  @ApiExtraModels(CreateTextMessageDto, CreateDocumentMessageDto)
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(CreateTextMessageDto) },
        { $ref: getSchemaPath(CreateDocumentMessageDto) },
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
          [MessageTypes.TEXT]: CreateTextMessageDto,
          [MessageTypes.DOCUMENT]: CreateDocumentMessageDto,
        },
      }),
    )
    dto: CreateMessageDto,
  ) {
    return this.service.newMessage(chat_id, { sender: user.id, ...dto });
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
