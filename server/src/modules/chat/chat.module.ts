import { DbChat } from 'src/db-models/chat.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { MessageModule } from '../message';
import { UserChatsModule } from '../user-modules/user-chats/user-chats.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatMapperProfile } from './mapper-profile/chat-mapper-profile';

const mapperProfileProviders = [ChatMapperProfile];

@Module({
  imports: [
    NestgooseModule.forFeature([DbChat]),
    UserChatsModule,
    MessageModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, ...mapperProfileProviders],
})
export class ChatModule {}
