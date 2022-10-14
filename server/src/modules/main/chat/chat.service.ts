import { Chat, ChatModel } from '@modules/extra/models/chat.model';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestgoose';
import { UserChatsService } from '../user/modules/user-chats/user-chats.service';
import { CreateNewChatData } from './data-types';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat) private model: ChatModel,
    private userChatsService: UserChatsService,
  ) {}

  async getChat(userId: string, chatId: string) {
    const chat = await this.model.findById(chatId);

    if (!chat.checkIsMember(userId)) throw new ForbiddenException();
    return chat;
  }

  async create(data: CreateNewChatData) {
    const newChat = await this.model.create({
      ...data,
      members: data.members.map((memberId) => ({
        user_id: memberId,
        is_admin: memberId === data.creator_id,
      })),
    });

    this.userChatsService.addChatToMembers(newChat.id, data.members);
    return newChat;
  }

  async findOne(chatId: string) {
    return this.model.findById(chatId).exec();
  }
}
