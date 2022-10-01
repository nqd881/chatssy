import { DatabaseModule } from '@modules/extra/database';
import { User } from '@modules/extra/database/schemas';
import { Module } from '@nestjs/common';
import { UserChatsController } from './user-chats.controller';
import { UserChatsService } from './user-chats.service';

@Module({
  imports: [...DatabaseModule.use(User)],
  controllers: [UserChatsController],
  providers: [UserChatsService],
  exports: [UserChatsService],
})
export class UserChatsModule {}
