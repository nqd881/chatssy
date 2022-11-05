import {
  modelOptions,
  prop,
  PropType,
  Ref,
  Severity,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Chat } from '../chat.model';
import { MessageBucket } from '../message-bucket.model';
import { User } from '../user/user.model';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
  schemaOptions: {
    discriminatorKey: 'type',
  },
})
export abstract class MessageBase extends mongoose.Types.Subdocument {
  @prop({ ref: () => Chat, required: true })
  chat_id: Ref<Chat>;

  @prop({ ref: () => MessageBucket, required: true })
  bucket_id: Ref<MessageBucket>;

  @prop({ ref: () => User, required: true })
  sender_id: Ref<User>;

  @prop({ required: true })
  date: number;

  @prop({ ref: () => User, default: [] }, PropType.ARRAY)
  mentions: Ref<User>[];

  @prop({ required: true })
  abstract type: string;

  @prop({ required: true })
  abstract content: any;
}
