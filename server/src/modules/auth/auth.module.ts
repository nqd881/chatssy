import { Module } from '@nestjs/common';
import { SessionModule } from '../session';
import { UserAuthModule } from '../user-modules/user-auth/user-auth.module';
import { UserProfileModule } from '../user-modules/user-profile/user-profile.module';
import { UserModule } from '../user-modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    // NestgooseModule.forFeature([DbUser, DbUserProfile, DbUserSetting, DbUserAuth]),
    UserAuthModule,
    UserProfileModule,
    UserModule,
    SessionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
