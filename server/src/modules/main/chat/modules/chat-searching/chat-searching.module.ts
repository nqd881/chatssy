import { Chat } from '@modules/extra/models/chat.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { ChatSearchingService } from './chat-searching.service';

@Module({
  imports: [NestgooseModule.forFeature([Chat])],
  providers: [ChatSearchingService],
  exports: [ChatSearchingService],
})
export class ChatSearchingModule {}
