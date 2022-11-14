import { DbUser } from 'src/db-models/user/user.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserChatsController } from './user-chats.controller';
import { UserChatsService } from './user-chats.service';

@Module({
  imports: [NestgooseModule.forFeature([DbUser])],
  controllers: [UserChatsController],
  providers: [UserChatsService],
  exports: [UserChatsService],
})
export class UserChatsModule {}
