import { Module } from '@nestjs/common';
import { UserAuthModule } from './modules/user-auth/user-auth.module';
import { UserChatsModule } from './modules/user-chats/user-chats.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { UserRegistrationModule } from './modules/user-registration/user-registration.module';
import { UserSettingModule } from './modules/user-setting/user-setting.module';

@Module({
  imports: [
    UserRegistrationModule,
    UserAuthModule,
    UserProfileModule,
    UserChatsModule,
    UserSettingModule,
  ],
})
export class UserModule {}
