import { MessageBucket } from '@modules/extra/models/message-bucket.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [NestgooseModule.forFeature([MessageBucket])],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
