import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { buildModuleDefinition } from '../buildModuleDefinition';
import { GetDocumentType } from '../types';

@Schema()
export class Message {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Chat',
    required: true,
  })
  Chat_id: string;

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'MessageBucket',
    required: true,
  })
  bucket_id: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId, default: null })
  reply_to: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  sender_id: string;

  @Prop({ default: false })
  pinned: boolean;

  @Prop({ required: true })
  date: number;

  @Prop({ type: [mongoose.SchemaTypes.ObjectId] })
  mentions: string[];

  @Prop()
  content: string;
}

export const { moduleDefinition: MessageMD, schema: MessageSchema } =
  buildModuleDefinition(Message);

export type MessageDocument = GetDocumentType<Message>;
export type MessageModel = Model<MessageDocument>;
