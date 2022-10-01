import { Chat, ChatDocument, ChatModel } from '@modules/extra/database/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserChatsService } from '../user/modules/user-chats/user-chats.service';
import { CreateNewChatData } from './data-types';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private model: ChatModel,
    private userChatsService: UserChatsService,
  ) {}

  checkIsMember(chat: ChatDocument, userId: string) {
    return chat.members.some((member) => member.user_id === userId);
  }

  async getOneChat(userId: string, chatId: string) {
    const chat = await this.model.findById(chatId);
    //Missing: Check user is a member of the chat
    return chat;
  }

  async create(data: CreateNewChatData) {
    const newChat = await this.model.create({
      ...data,
      members: data.members.map((memberId) => ({
        user_id: memberId,
        is_admin: memberId === data.creator,
      })),
    });

    this.userChatsService.addChatToMembers(newChat.id, data.members);
    return newChat;
  }

  async findOne(chatId: string) {
    return this.model.findById(chatId).exec();
  }
}
