import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Chat } from './chat.model';
import { Message } from './message/message.model';

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
})
export class MessageBucket {
  @prop({ ref: () => Chat, required: true })
  chat_id: Ref<Chat>;

  @prop()
  order: number;

  @prop({ default: 0 })
  messages_count: number;

  @prop({ type: () => [Message], default: [] }, PropType.ARRAY)
  messages: mongoose.Types.Array<Message>;

  @prop({ default: null })
  last_message: Message;
}

export type MessageBucketDoc = DocumentType<MessageBucket>;
export type MessageBucketModel = ReturnModelType<typeof MessageBucket>;
