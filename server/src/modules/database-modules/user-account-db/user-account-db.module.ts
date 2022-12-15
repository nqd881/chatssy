import { DbUserAccount } from '@dbmodels/user2/user-account.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestgooseModule } from 'nestgoose';
import { UserAccountDbService } from './user-account-db.service';

@Module({
  imports: [NestgooseModule.forFeature([DbUserAccount]), ConfigModule],
  providers: [UserAccountDbService],
  exports: [UserAccountDbService],
})
export class UserAccountDbModule {}
