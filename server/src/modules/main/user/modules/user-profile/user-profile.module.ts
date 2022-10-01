import { DatabaseModule } from '@modules/extra/database';
import { User } from '@modules/extra/database/schemas';
import { Module } from '@nestjs/common';
import { UserSearchingModule } from '../user-searching/user-searching.module';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';

@Module({
  imports: [...DatabaseModule.use(User.name), UserSearchingModule],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
