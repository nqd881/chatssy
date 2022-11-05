import { User } from '@modules/extra/models/user/user.model';
import { TokenModule } from '@modules/main/token';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserRegistrationController } from './user-registration.controller';
import { UserRegistrationService } from './user-registration.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserAuthModule } from '../user-auth/user-auth.module';

@Module({
  imports: [
    NestgooseModule.forFeature([User]),
    TokenModule,
    MailerModule,
    UserAuthModule,
  ],
  controllers: [UserRegistrationController],
  providers: [UserRegistrationService],
  exports: [UserRegistrationService],
})
export class UserRegistrationModule {}
