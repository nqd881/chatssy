import {
  modelOptions,
  prop,
  PropType,
  Ref,
  Severity,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { DbChat } from '../chat.model';
import { DbMessageBucket } from '../message-bucket.model';
import { DbUser } from '../user/user.model';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
  schemaOptions: {
    discriminatorKey: 'type',
  },
})
export abstract class DbMessageBase extends mongoose.Types.Subdocument {
  @prop({ ref: () => DbChat, required: true })
  chatId: Ref<DbChat>;

  @prop({ ref: () => DbMessageBucket, required: true })
  bucketId: Ref<DbMessageBucket>;

  @prop({ ref: () => DbUser, required: true })
  senderId: Ref<DbUser>;

  @prop({ required: true })
  date: number;

  @prop({ ref: () => DbUser, default: [] }, PropType.ARRAY)
  mentions: Ref<DbUser>[];

  @prop({ required: true })
  abstract type: string;

  @prop({ required: true })
  abstract content: any;
}
