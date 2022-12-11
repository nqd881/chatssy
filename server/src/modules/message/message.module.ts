import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { DbMessage } from 'src/db-models/message';
import { DbMessageBucket } from 'src/db-models/message-bucket.model';
import { MessageService } from './message.service';

@Module({
  imports: [NestgooseModule.forFeature([DbMessageBucket, DbMessage])],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
