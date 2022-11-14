import { DbUser } from 'src/db-models/user/user.model';
import { TokenModule } from '@modules/token';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { DbUserAuth } from 'src/db-models/user/user-auth.model';

@Module({
  imports: [
    NestgooseModule.forFeature([DbUser, DbUserAuth]),
    MailerModule,
    TokenModule,
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
