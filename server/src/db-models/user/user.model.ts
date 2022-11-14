import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
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
    toJSON: {
      transform(doc, ret) {
        delete ret.auth;
        return ret;
      },
    },
  },
})
export class DbUser {
  @prop({ enum: UserTypes, default: UserTypes.REGULAR })
  userType: UserTypes;

  @prop({ type: [DbUserChat], default: [] }, PropType.ARRAY)
  chats: mongoose.Types.Array<DbUserChat>;

  @prop({ ref: () => DbUserProfile, default: null })
  profileId: Ref<DbUserProfile>;

  @prop({ ref: () => DbUserSetting, default: null })
  settingId: Ref<DbUserSetting>;

  @prop({ ref: () => DbUserAuth, default: null })
  authId: Ref<DbUserAuth>;
}

export type DbUserDoc = DocumentType<DbUser>;
export type DbUserModel = ReturnModelType<typeof DbUser>;
