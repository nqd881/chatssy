import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import mongoose, { Types } from 'mongoose';
import { DbUserAuth } from './user-auth.model';
import { DbUserChat } from './user-chat.model';
import { DbUserProfile } from './user-profile.model';
import { DbUserSetting } from './user-setting';

export enum UserTypes {
  ADMIN = 'admin',
  REGULAR = 'regular',
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
})
export class DbUser {
  @prop({ enum: UserTypes, default: UserTypes.REGULAR })
  userType: UserTypes;

  @Type(() => DbUserChat)
  @prop({ type: [DbUserChat], default: [] }, PropType.ARRAY)
  chats: DbUserChat[];

  @prop({ required: true })
  profileId: Types.ObjectId;

  @prop({ required: true })
  settingId: Types.ObjectId;

  @prop({ required: true })
  authId: Types.ObjectId;
}

export type DbUserDoc = DocumentType<DbUser>;
export type DbUserModel = ReturnModelType<typeof DbUser>;
