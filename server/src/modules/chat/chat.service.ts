import { DbChat, DbChatModel } from 'src/db-models/chat.model';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestgoose';
import { MessageService } from '../message';
import { AddMessageData } from '../message/data-types';
import { UserChatsService } from '../user-modules/user-chats/user-chats.service';
import { CreateNewChatArgs } from './args';
import { plainToInstance } from 'class-transformer';
import { docToPlain } from '@utils/mongodb';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(DbChat) private chatModel: DbChatModel,
    private userChatsService: UserChatsService,
    private messageService: MessageService,
  ) {}

  async getChat(chatId: string) {
    return this.chatModel.findById(chatId);
  }

  async create({ title, creatorId, memberIds }: CreateNewChatArgs) {
    const newChat = await this.chatModel.create({
      title,
      creatorId,
      members: memberIds.map((memberId) => ({
        userId: memberId,
        inviterId: creatorId,
        isAdmin: memberId === creatorId,
      })),
    });

    this.userChatsService.addChatToMembers(newChat.id, memberIds);

    return newChat;
    // console.log(newChat);

    // return plainToInstance(DbChat, docToPlain(newChat));
  }

  async findOne(chatId: string) {
    return this.chatModel.findById(chatId);
  }

  async getChatMessages(chatId: string) {}

  async addNewBucket(chatId: string, bucketId: string) {
    return this.chatModel.findByIdAndUpdate(
      chatId,
      {
        $push: { bucketIds: bucketId },
      },
      { new: true },
    );
  }

  async newMessage(chatId: string, data: AddMessageData) {
    return this.messageService.newMessage(chatId, data);
  }
}
