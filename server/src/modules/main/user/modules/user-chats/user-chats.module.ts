import { User } from '@modules/extra/models/user/user.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserChatsController } from './user-chats.controller';
import { UserChatsService } from './user-chats.service';

@Module({
  imports: [NestgooseModule.forFeature([User])],
  controllers: [UserChatsController],
  providers: [UserChatsService],
  exports: [UserChatsService],
})
export class UserChatsModule {}
