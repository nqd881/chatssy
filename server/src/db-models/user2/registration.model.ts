import { applyDefault } from '@dbmodels/utils';
import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';

export enum DbRegistrationStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  SUCCESSFUL = 'successful',
}

@modelOptions({
  schemaOptions: {
    _id: false,
    versionKey: false,
  },
})
export class DbRegistrationUrlRedirections {
  @prop({ default: null })
  success: string;

  @prop({ default: null })
  failure: string;
}

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class DbRegistration {
  @prop({ required: true })
  accountId: Types.ObjectId;

  @prop({ required: true })
  userId: Types.ObjectId;

  @prop({ required: true })
  tokenId: Types.ObjectId;

  @prop({ required: true })
  emailAddress: string;

  @prop({ rquired: true, default: DbRegistrationStatus.PENDING })
  status: DbRegistrationStatus;

  @prop({ default: applyDefault })
  urlRedirections: DbRegistrationUrlRedirections;
}

export type DbRegistrationDoc = DocumentType<DbRegistration>;
export type DbRegistrationModel = ReturnModelType<typeof DbRegistration>;
