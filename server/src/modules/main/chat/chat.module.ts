import { Chat } from '@modules/extra/models/chat.model';
import { User } from '@modules/extra/models/user/user.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserChatsModule } from '../user/modules/user-chats/user-chats.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatSearchingModule } from './modules/chat-searching/chat-searching.module';

@Module({
  // imports: [...DatabaseModule.use(Chat, User), UserChatsModule],
  imports: [
    NestgooseModule.forFeature([Chat]),
    ChatSearchingModule,
    UserChatsModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
