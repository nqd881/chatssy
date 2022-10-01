import { PasswordModule, PasswordService } from '@modules/extra/password';
import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { GetDocumentType } from '../types';

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserChatStates {
  STARTED = 'started',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export enum SocialNetworkPlatform {
  FACEBOOK = 'facebook_platform',
  INSTAGRAM = 'instagram_platform',
  TWITTER = 'twitter_platform',
  TELEGRAM = 'telegram_platform',
}

@Schema({
  _id: false,
})
export class SocialNetworkContact {
  @Prop({ type: String, enum: SocialNetworkPlatform })
  platform: SocialNetworkPlatform;

  @Prop()
  url: string;
}

@Schema({
  _id: false,
})
export class UserProfile {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({ default: null })
  birth_date: Date;

  @Prop({ default: '' })
  avatar_url: string;
}

@Schema({
  _id: false,
})
export class UserAuth {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

@Schema({ _id: false })
export class UserSettingSecurity {
  @Prop({ default: false })
  tfa: boolean;
}

@Schema({
  _id: false,
})
export class UserSetting {
  @Prop({ default: 'en' })
  language: string;

  @Prop({ type: UserSettingSecurity, default: {} })
  security: UserSettingSecurity;
}

@Schema({
  _id: false,
})
export class UserChat {
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'Chat', required: true })
  chat_id: string;

  @Prop({ required: true, enum: UserChatStates })
  state: UserChatStates;
}

export const UserChatSchema = SchemaFactory.createForClass(UserChat);

@Schema({
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.auth;
    },
  },
})
export class User {
  @Prop({ default: false })
  active: boolean;

  @Prop({ index: true, default: null })
  email: string;

  @Prop({ default: false })
  email_verified: boolean;

  @Prop({ index: true, default: null })
  phone: string;

  @Prop({ default: false })
  phone_verified: boolean;

  @Prop({ type: String, enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @Prop({ type: UserProfile, default: {} })
  profile: UserProfile;

  @Prop({ type: UserAuth, default: {} })
  auth: UserAuth;

  @Prop({ type: UserSetting, default: {} })
  setting: UserSetting;

  @Prop({ type: [UserChatSchema] })
  chats: UserChat[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaFactory = (passwordService: PasswordService) => {
  const schema = UserSchema;

  schema.pre('save', async function () {
    if (this.isModified('auth.password')) {
      const hashedPassword = await passwordService.hash(
        this.get('auth.password'),
      );
      this.set('auth.password', hashedPassword);
    }
  });
  return schema;
};

export const UserModelFactory: AsyncModelFactory = {
  name: User.name,
  imports: [PasswordModule],
  useFactory: UserSchemaFactory,
  inject: [PasswordService],
};

export type UserDocument = GetDocumentType<User>;
export type UserModel = Model<UserDocument>;
