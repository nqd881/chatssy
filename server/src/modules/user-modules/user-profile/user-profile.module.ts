import { DbUserProfile } from 'src/db-models/user/user-profile.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';

@Module({
  imports: [NestgooseModule.forFeature([DbUserProfile])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
