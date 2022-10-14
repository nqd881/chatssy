import { EmailModule } from '@modules/extra/email';
import { User } from '@modules/extra/models/user/user.model';
import { TokenModule } from '@modules/main/token';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserRegistrationController } from './user-registration.controller';
import { UserRegistrationService } from './user-registration.service';

@Module({
  imports: [NestgooseModule.forFeature([User]), TokenModule, EmailModule],
  controllers: [UserRegistrationController],
  providers: [UserRegistrationService],
  exports: [UserRegistrationService],
})
export class UserRegistrationModule {}
