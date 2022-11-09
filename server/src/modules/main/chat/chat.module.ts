import { Chat } from '@modules/extra/models/chat.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { MessageModule } from '../message';
import { UserChatsModule } from '../user/modules/user-chats/user-chats.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatSearchingModule } from './modules/chat-searching/chat-searching.module';

@Module({
  imports: [
    NestgooseModule.forFeature([Chat]),
    ChatSearchingModule,
    UserChatsModule,
    MessageModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
