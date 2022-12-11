import { DbPhoto } from '@dbmodels/photo.model';
import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { DbAddress } from '../address.model';
import { applyDefault } from '../utils';
import { DbUser } from './user.model';

export enum DbGenderTypes {
  Male = 'male',
  Female = 'female',
}

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class DbUserProfile {
  @prop({ required: true, unique: true, index: true })
  userId: Types.ObjectId;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ enum: DbGenderTypes, default: null })
  gender: DbGenderTypes;

  @prop({ default: null })
  birthDate: Date;

  @prop({ default: null })
  photo: DbPhoto;

  @prop({ default: applyDefault })
  address: DbAddress;
}

export type DbUserProfileDoc = DocumentType<DbUserProfile>;
export type DbUserProfileModel = ReturnModelType<typeof DbUserProfile>;
