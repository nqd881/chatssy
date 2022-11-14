import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  Ref,
  ReturnModelType,
  Severity,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { DbChat } from './chat.model';
import { Message, MessageDoc, DbMessageBase } from './message';

@modelOptions({
  schemaOptions: {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class DbMessageBucket {
  @prop({ ref: () => DbChat, required: true, index: true })
  chatId: Ref<DbChat>;

  @prop({ required: true })
  isLastBucket: boolean;

  @prop({ ref: () => DbMessageBucket, default: null })
  prevBucketId: Ref<DbMessageBucket>;

  @prop({ required: true })
  order: number;

  @prop({ default: 0 })
  messagesCount: number;

  @prop({ default: [] }, PropType.ARRAY)
  messages: mongoose.Types.Array<Message>;

  @prop({ default: null })
  lastMessage: Message;
}

export type DbMessageBucketDoc = DocumentType<DbMessageBucket>;
export type DbMessageBucketModel = ReturnModelType<typeof DbMessageBucket>;
