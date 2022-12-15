import { DbUser } from '@dbmodels/user2/user.model';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserDbService } from './user-db.service';

@Module({
  imports: [NestgooseModule.forFeature([DbUser])],
  providers: [UserDbService],
  exports: [UserDbService],
})
export class UserDbModule {}
