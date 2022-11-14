import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import { DbAddress } from '../address.model';
import { DbPhoto } from '../photo.model';
import { applyDefault } from '../utils';
import { DbUser } from './user.model';

@modelOptions({})
export class DbUserProfile {
  @prop({ ref: () => DbUser, required: true, unique: true, index: true })
  userId: Ref<DbUser>;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ default: null })
  birthDate: Date;

  @prop({ default: null })
  photo: string;

  @prop({ default: applyDefault })
  address: DbAddress;
}

export type DbUserProfileDoc = DocumentType<DbUserProfile>;
export type DbUserProfileModel = ReturnModelType<typeof DbUserProfile>;
