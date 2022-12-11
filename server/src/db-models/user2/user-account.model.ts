import { applyDefault } from '@dbmodels/utils';
import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
  schemaOptions: {
    _id: false,
    versionKey: false,
  },
})
export class DbUserAccountEmail {
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
export class DbUserAccountCredentials {
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
export class DbUserAccountPhone {
  @prop({ required: true })
  phoneNumber: string;

  @prop({ default: false })
  isVerified: boolean;
}

@modelOptions({
  schemaOptions: {
    _id: false,
    versionKey: false,
  },
})
export class DbUserAccountSecurity {
  @prop({ default: false })
  tfaEnabled: boolean;

  @prop({}, PropType.ARRAY)
  tfaRecoveryCodes: string[];
}

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class DbUserAccount {
  @prop({ required: true, unique: true, index: true })
  userId: Types.ObjectId;

  @prop({ required: true })
  credentials: DbUserAccountCredentials;

  @prop({ required: true })
  mainEmail: DbUserAccountEmail;

  @prop({ default: null })
  extraEmail: DbUserAccountEmail;

  @prop({ default: null })
  phone: DbUserAccountPhone;

  @prop({ default: applyDefault })
  security: DbUserAccountSecurity;

  @prop({ require: true, default: false })
  isActivated: boolean;
}

export type DbUserAccountDoc = DocumentType<DbUserAccount>;
export type DbUserAccountModel = ReturnModelType<typeof DbUserAccount>;
