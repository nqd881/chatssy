import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { applyDefault } from '../../utils';
import { DbUserSettingLanguage } from './language.model';
import { DbUserSettingSecurity } from './security.model';

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class DbUserSetting {
  @prop({ required: true, unique: true, index: true })
  userId: Types.ObjectId;

  @prop({ default: applyDefault })
  language: DbUserSettingLanguage;

  @prop({ default: applyDefault })
  security: DbUserSettingSecurity;
}

export type DbUserSettingDoc = DocumentType<DbUserSetting>;
export type DbUserSettingModel = ReturnModelType<typeof DbUserSetting>;
