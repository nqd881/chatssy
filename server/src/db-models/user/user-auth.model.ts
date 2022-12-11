import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { DbUser } from './user.model';

@modelOptions({
  schemaOptions: {
    _id: false,
    versionKey: false,
  },
})
export class UserAuthEmail {
  @prop({ required: true })
  emailAddress: string;

  @prop({ default: false })
  isVerified: boolean;
}

@modelOptions({
  schemaOptions: {
    _id: false,
    versionKey: false,
  },
})
export class UserAuthCredentials {
  @prop({ required: true })
  username: string;

  @prop({ required: true })
  password: string;
}

@modelOptions({
  schemaOptions: {
    _id: false,
    versionKey: false,
  },
})
export class UserAuthPhone {
  @prop({ required: true })
  phoneNumber: string;

  @prop({ default: false })
  isVerified: boolean;
}

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class DbUserAuth {
  @prop({ required: true, unique: true, index: true })
  userId: Types.ObjectId;

  @prop({ required: true })
  credentials: UserAuthCredentials;

  // @prop({ required: true })
  // username: string;

  // @prop({ required: true })
  // password: string;

  @prop({ required: true })
  mainEmail: UserAuthEmail;

  @prop({ default: null })
  extraEmail: UserAuthEmail;

  @prop({ default: null })
  phone: UserAuthPhone;

  @prop({ require: true, default: false })
  isActivated: boolean;
}

export type DbUserAuthDoc = DocumentType<DbUserAuth>;
export type DbUserAuthModel = ReturnModelType<typeof DbUserAuth>;
