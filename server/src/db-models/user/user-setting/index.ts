import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import { applyDefault } from '../../utils';
import { DbUser } from '../user.model';
import { DbUserSettingLanguage } from './language.model';
import { DbUserSettingSecurity } from './security.model';

@modelOptions({})
export class DbUserSetting {
  @prop({ ref: () => DbUser, required: true, unique: true, index: true })
  userId: Ref<DbUser>;

  @prop({ default: applyDefault })
  language: DbUserSettingLanguage;

  @prop({ default: applyDefault })
  security: DbUserSettingSecurity;
}

export type DbUserSettingDoc = DocumentType<DbUserSetting>;
export type DbUserSettingModel = ReturnModelType<typeof DbUserSetting>;
