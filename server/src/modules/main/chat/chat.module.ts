import { DatabaseModule } from '@modules/extra/database';
import { Module } from '@nestjs/common';
import { Chat, User } from '@schemas';
import { UserChatsModule } from '../user/modules/user-chats/user-chats.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [...DatabaseModule.use(Chat, User), UserChatsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
