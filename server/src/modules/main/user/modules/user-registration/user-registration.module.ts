import { DatabaseModule } from '@modules/extra/database';
import { User } from '@modules/extra/database/schemas';
import { EmailModule } from '@modules/extra/email';
import { VerificationTokenModule } from '@modules/extra/verification_token';
import { Module } from '@nestjs/common';
import { UserRegistrationController } from './user-registration.controller';
import { UserRegistrationService } from './user-registration.service';

@Module({
  imports: [
    ...DatabaseModule.use(User.name),
    VerificationTokenModule,
    EmailModule,
  ],
  controllers: [UserRegistrationController],
  providers: [UserRegistrationService],
  exports: [UserRegistrationService],
})
export class UserRegistrationModule {}
