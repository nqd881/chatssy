import { User } from '@modules/extra/models/user/user.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserSearchingModule } from '../user-searching/user-searching.module';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';

@Module({
  imports: [NestgooseModule.forFeature([User]), UserSearchingModule],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
