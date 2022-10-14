import { User } from '@modules/extra/models/user/user.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserSearchingService } from './user-searching.service';

@Module({
  imports: [NestgooseModule.forFeature([User])],
  providers: [UserSearchingService],
  exports: [UserSearchingService],
})
export class UserSearchingModule {}
