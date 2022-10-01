import { EmailModule } from '@modules/extra/email';
import { OtpModule } from '@modules/extra/otp';
import { PasswordModule } from '@modules/extra/password';
import { RedisCacheModule } from '@modules/extra/redis_cache';
import { Module } from '@nestjs/common';
import { UserAuthModule } from '../user/modules/user-auth/user-auth.module';
import { UserRegistrationModule } from '../user/modules/user-registration/user-registration.module';
import { UserSearchingModule } from '../user/modules/user-searching/user-searching.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CsrfService } from './services/csrf.service';
import { SessionService } from './services/session.service';

@Module({
  imports: [
    RedisCacheModule,
    EmailModule,
    OtpModule,
    PasswordModule,
    UserSearchingModule,
    UserRegistrationModule,
    UserAuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CsrfService, SessionService],
})
export class AuthModule {}
