import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
  Severity,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Chat } from './chat.model';
import { Message, MessageDoc } from './message';

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
export class MessageBucket {
  @prop({ ref: () => Chat, required: true, index: true })
  chat_id: Ref<Chat>;

  @prop({ required: true })
  is_last_bucket: boolean;

  @prop({ ref: () => MessageBucket, default: null })
  prev_bucket_id: Ref<MessageBucket>;

  @prop({ required: true })
  order: number;

  @prop({ default: 0 })
  messages_count: number;

  @prop({ default: [] })
  messages: mongoose.Types.DocumentArray<Message>;
  // messages: mongoose.Types.Array<MessageDoc>;

  @prop({ default: null })
  last_message: Message;
  // last_message: MessageDoc;
}

export type MessageBucketDoc = DocumentType<MessageBucket>;
export type MessageBucketModel = ReturnModelType<typeof MessageBucket>;
