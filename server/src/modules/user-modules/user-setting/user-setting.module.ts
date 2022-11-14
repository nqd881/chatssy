import { DbUserSetting } from 'src/db-models/user/user-setting';
import { Module } from '@nestjs/common';
import { NestgooseModule } from 'nestgoose';
import { UserSettingController } from './user-setting.controller';
import { UserSettingService } from './user-setting.service';

@Module({
  imports: [NestgooseModule.forFeature([DbUserSetting])],
  controllers: [UserSettingController],
  providers: [UserSettingService],
})
export class UserSettingModule {}
