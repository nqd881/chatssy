import { Chat, ChatModel } from '@modules/extra/models/chat.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestgoose';

@Injectable()
export class ChatSearchingService {
  constructor(@InjectModel(Chat) private chatModel: ChatModel) {}

  findOneChat() {
    return this.chatModel.findOne();
  }

  findChats() {
    return this.chatModel.find();
  }

  findChatById(chatId: string) {
    return this.chatModel.findById(chatId);
  }

  findChatsById(chatIds: string) {
    return this.chatModel.find({ _id: chatIds });
  }
}
