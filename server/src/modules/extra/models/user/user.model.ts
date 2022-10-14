import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  ReturnModelType,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Photo } from '../photo.model';
import { applyDefault, timestampsSchemaConfig } from '../utils';
import { UserAuth } from './user-auth.model';
import { UserChat } from './user-chat.model';
import { UserEmail } from './user-email.model';
import { UserPhone } from './user-phone.model';
import { UserProfile } from './user-profile.model';
import { UserSetting } from './user-setting';

export enum UserTypes {
  ADMIN = 'admin',
  REGULAR = 'regular',
}

@modelOptions({
  schemaOptions: {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.auth;
      },
    },
    timestamps: timestampsSchemaConfig,
  },
})
export class User {
  @prop({ default: false })
  active: boolean;

  @prop({ default: applyDefault })
  email: UserEmail;

  @prop({ default: applyDefault })
  phone: UserPhone;

  @prop({ default: null })
  photo: Photo;

  @prop({ default: applyDefault })
  auth: UserAuth;

  @prop({ default: applyDefault })
  profile: UserProfile;

  @prop({ default: applyDefault })
  setting: UserSetting;

  @prop({ enum: UserTypes, default: UserTypes.REGULAR })
  user_type: UserTypes;

  @prop({ type: [UserChat], default: [] }, PropType.ARRAY)
  chats: mongoose.Types.Array<UserChat>;
}

export type UserDoc = DocumentType<User>;
export type UserModel = ReturnModelType<typeof User>;
