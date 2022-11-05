import { User } from '@modules/extra/models/user/user.model';
import { TokenModule } from '@modules/main/token';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [NestgooseModule.forFeature([User]), MailerModule, TokenModule],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
