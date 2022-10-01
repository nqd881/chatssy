import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { buildModuleDefinition } from '../buildModuleDefinition';
import { GetDocumentType } from '../types';
import { Message, MessageSchema } from './message.schema';

@Schema()
export class MessageBucket {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Chat',
    required: true,
  })
  Chat_id: string;

  @Prop({ required: true, default: 0 })
  count: number;

  @Prop({ type: [MessageSchema] })
  messages: Message[];
}

export const { moduleDefinition: MessageBucketMD } =
  buildModuleDefinition(MessageBucket);

export type MessageBucketDocument = GetDocumentType<MessageBucket>;
export type MessageBucketModel = Model<MessageBucketDocument>;
