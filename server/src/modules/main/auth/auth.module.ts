import { Module } from '@nestjs/common';
import { UserAuthModule } from '../user/modules/user-auth/user-auth.module';
import { UserRegistrationModule } from '../user/modules/user-registration/user-registration.module';
import { UserSearchingModule } from '../user/modules/user-searching/user-searching.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserSearchingModule, UserRegistrationModule, UserAuthModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
