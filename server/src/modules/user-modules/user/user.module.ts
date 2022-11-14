import { DbUserAuth } from 'src/db-models/user/user-auth.model';
import { DbUserProfile } from 'src/db-models/user/user-profile.model';
import { DbUserSetting } from 'src/db-models/user/user-setting';
import { DbUser } from 'src/db-models/user/user.model';
import { TokenModule } from '@modules/token';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserAuthModule } from '../user-auth/user-auth.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { UserSettingModule } from '../user-setting/user-setting.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    NestgooseModule.forFeature([
      DbUser,
      DbUserAuth,
      DbUserSetting,
      DbUserProfile,
    ]),
    TokenModule,
    MailerModule,
    UserAuthModule,
    UserProfileModule,
    UserSettingModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
