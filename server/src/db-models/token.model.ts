import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';

@modelOptions({})
export class DbToken {
  @prop({ required: true })
  code: string;

  @prop({ required: true })
  expiredAt: number;

  isValid(this: DbTokenDoc) {
    const now = Date.now();
    return now <= this.expiredAt;
  }
}

export type DbTokenDoc = DocumentType<DbToken>;
export type DbTokenModel = ReturnModelType<typeof DbToken>;
