import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';

export enum DbTokenStatus {
  LOCKED = 'locked',
  UNLOCKED = 'unlocked',
}

@modelOptions({})
export class DbToken {
  @prop({ required: true, index: true })
  name: string;

  @prop({ required: true })
  code: string;

  @prop()
  time: number;

  @prop({ required: true })
  expiredAt: number;

  @prop({ required: true })
  status: DbTokenStatus;
}

export type DbTokenDoc = DocumentType<DbToken>;
export type DbTokenModel = ReturnModelType<typeof DbToken>;
