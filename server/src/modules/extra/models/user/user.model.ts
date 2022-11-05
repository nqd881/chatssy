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

  getEmail(this: UserDoc) {
    return this.email.address;
  }

  getName(this: UserDoc) {
    const { first_name, last_name } = this.profile;
    return `${first_name} ${last_name}`;
  }
}

export type UserDoc = DocumentType<User>;
export type UserModel = ReturnModelType<typeof User>;
