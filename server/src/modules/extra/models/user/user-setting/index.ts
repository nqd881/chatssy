import { modelOptions, prop } from '@typegoose/typegoose';
import { applyDefault } from '../../utils';
import { UserSettingLanguage } from './language.model';
import { UserSettingSecurity } from './security.model';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class UserSetting {
  @prop({ default: applyDefault })
  language: UserSettingLanguage;

  @prop({ default: applyDefault })
  security: UserSettingSecurity;
}
