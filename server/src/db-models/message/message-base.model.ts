import { modelOptions, prop, PropType, Severity } from '@typegoose/typegoose';
import mongoose, { Types } from 'mongoose';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
  schemaOptions: {
    discriminatorKey: 'type',
  },
})
export abstract class DbMessageBase extends mongoose.Types.Subdocument {
  @prop({ required: true })
  chatId: Types.ObjectId;

  @prop({ required: true })
  bucketId: Types.ObjectId;

  @prop({ required: true })
  senderId: Types.ObjectId;

  @prop({ required: true })
  date: number;

  @prop({ default: [] }, PropType.ARRAY)
  mentions: Types.Array<Types.ObjectId>;

  @prop({ required: true })
  abstract type: string;

  @prop({ required: true })
  abstract content: any;
}
