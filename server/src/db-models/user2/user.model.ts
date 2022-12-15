import { DbAddress } from '@dbmodels/address.model';
import { DbPhoto } from '@dbmodels/photo.model';
import { applyDefault } from '@dbmodels/utils';
import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';

export enum DbGenders {
  MALE = 'male',
  FEMALE = 'female',
  ANOTHER = 'another',
}

export enum DbLanguageCodes {
  EN = 'en',
  VI = 'vi',
}

export enum DbUserStatusValues {
  OFFLINE = 'offline',
  ONLINE = 'online',
}

@modelOptions({
  schemaOptions: {
    _id: false,
    versionKey: false,
  },
})
export class DbUserStatus {
  @prop({ default: null })
  lastActivityAt: number;

  @prop({ default: null })
  value: DbUserStatusValues;
}

@modelOptions({})
export class DbUser {
  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ enum: DbGenders, default: DbGenders.ANOTHER })
  gender: DbGenders;

  @prop({ default: null })
  birthDate: Date;

  @prop({ default: null })
  photo: DbPhoto;

  @prop({ default: applyDefault })
  address: DbAddress;

  @prop({ default: null })
  status: DbUserStatus;

  @prop({ default: null })
  languageCode: DbLanguageCodes;
}

export type DbUserDoc = DocumentType<DbUser>;
export type DbUserModel = ReturnModelType<typeof DbUser>;
