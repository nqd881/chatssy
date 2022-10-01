import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { buildModuleDefinition } from '../buildModuleDefinition';
import { GetDocumentType } from '../types';

@Schema({
  _id: false,
})
export class ChatMember {
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true })
  user_id: string;

  @Prop({ required: true })
  is_admin: boolean;

  @Prop({ default: '' })
  nickname: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: '', default: null })
  seen: string;
}

export const ChatMemberSchema = SchemaFactory.createForClass(ChatMember);

@Schema({})
export class Chat {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  private: boolean;

  @Prop({ default: '' })
  avatar_url: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true })
  creator: string;

  @Prop({ type: [ChatMemberSchema], required: true })
  members: ChatMember[];

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'MessageBucket.messages',
  })
  last_message_id: string;

  @Prop({ type: [mongoose.SchemaTypes.ObjectId], ref: 'File' })
  files: string[];
}

export const { moduleDefinition: ChatMD } = buildModuleDefinition(Chat);

export type ChatDocument = GetDocumentType<Chat>;
export type ChatModel = Model<ChatDocument>;
