import { DbMessageBucket } from 'src/db-models/message-bucket.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { MessageService } from './message.service';

@Module({
  imports: [NestgooseModule.forFeature([DbMessageBucket])],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
