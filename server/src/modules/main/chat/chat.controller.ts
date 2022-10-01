import { UserChatStates } from '@modules/extra/database/schemas';
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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SessionUser } from 'express-session';
import { ChatssyApiTags } from 'src/constant/docs';
import { Session } from 'src/decorators/session.decorator';
import { AuthGuard } from 'src/guards';
import { ChatService } from './chat.service';
import { parseCreateChatPayload } from './parser/parseCreateChatPayload';
import { ChatIdentificationParam } from './types';
import { CreateNewChatReqBody } from './validations';

@ApiTags(ChatssyApiTags.Chat)
@Controller('chats')
export class ChatController {
  constructor(private service: ChatService) {}

  @Post()
  @UseGuards(AuthGuard)
  async newChat(
    @Req() req: Request,
    @Body() { payload }: CreateNewChatReqBody,
  ) {
    const data = parseCreateChatPayload(payload, req);
    return this.service.create(data);
  }

  @Get(':chat_id')
  @UseGuards(AuthGuard)
  async getOneChat(
    @Session('user') user: SessionUser,
    @Param() { chat_id }: ChatIdentificationParam,
  ) {
    return this.service.getOneChat(user.id, chat_id);
  }

  @Patch(':chat_id/members')
  @UseGuards(AuthGuard)
  async updateChatMembers(
    @Req() req: Request,
    @Param() { chat_id }: ChatIdentificationParam,
  ) {
    return null;
  }
}
