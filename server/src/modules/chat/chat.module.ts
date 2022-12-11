import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { DbChat } from 'src/db-models/chat.model';
import { MessageModule } from '../message';
import { UserChatsModule } from '../user-modules/user-chats/user-chats.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [
    NestgooseModule.forFeature([DbChat]),
    UserChatsModule,
    MessageModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
