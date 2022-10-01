import { DatabaseModule } from '@modules/extra/database';
import { User } from '@modules/extra/database/schemas';
import { Module } from '@nestjs/common';
import { UserSearchingService } from './user-searching.service';

@Module({
  imports: [...DatabaseModule.use(User.name)],
  providers: [UserSearchingService],
  exports: [UserSearchingService],
})
export class UserSearchingModule {}
