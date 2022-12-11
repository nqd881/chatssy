import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  ReturnModelType,
  Severity,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { DbMessage } from './message';
import { MongoDoc } from './utils';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class DbMessageBucket extends MongoDoc {
  @prop({ required: true, index: true })
  chatId: Types.ObjectId;

  @prop({ required: true })
  isLastBucket: boolean;

  @prop({ default: null })
  prevBucketId: Types.ObjectId;

  @prop({ required: true })
  order: number;

  @prop({ required: true })
  messagesMaxCount: number;

  @prop({ default: 0 })
  messagesCount: number;

  @prop({ default: [] }, PropType.ARRAY)
  messages: Types.Array<DbMessage>;

  getLastMessage(this: DbMessageBucketDoc) {
    const lastIndex = this.messagesCount - 1;
    return this.messages[lastIndex];
  }
}

export type DbMessageBucketDoc = DocumentType<DbMessageBucket>;
export type DbMessageBucketModel = ReturnModelType<typeof DbMessageBucket>;
