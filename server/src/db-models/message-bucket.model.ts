import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  Ref,
  ReturnModelType,
  Severity,
} from '@typegoose/typegoose';
import mongoose, { Types } from 'mongoose';
import { DbChat } from './chat.model';
import { DbMessage } from './message';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class DbMessageBucket {
  @prop({ required: true, index: true })
  chatId: Types.ObjectId;

  @prop({ required: true })
  isLastBucket: boolean;

  @prop({ default: null })
  prevBucketId: Types.ObjectId;

  @prop({ required: true })
  order: number;

  @prop({ default: 0 })
  messagesCount: number;

  @prop({ default: [] }, PropType.ARRAY)
  messages: mongoose.Types.Array<DbMessage>;

  @prop({ default: null })
  lastMessage: DbMessage;
}

export type DbMessageBucketDoc = DocumentType<DbMessageBucket>;
export type DbMessageBucketModel = ReturnModelType<typeof DbMessageBucket>;
