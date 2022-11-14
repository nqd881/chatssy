import {
  DbUserSetting,
  DbUserSettingModel,
} from 'src/db-models/user/user-setting';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestgoose';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectModel(DbUserSetting) private userSettingModel: DbUserSettingModel,
  ) {}
}
