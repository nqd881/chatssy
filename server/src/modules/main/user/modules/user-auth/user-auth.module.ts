import { DatabaseModule } from '@modules/extra/database';
import { User } from '@modules/extra/database/schemas';
import { EmailModule } from '@modules/extra/email';
import { VerificationTokenModule } from '@modules/extra/verification_token';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';

@Module({
  imports: [
    ...DatabaseModule.use(User),
    EmailModule,
    VerificationTokenModule,
    ConfigModule,
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
