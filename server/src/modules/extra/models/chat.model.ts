import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { MessageBucket } from './message-bucket.model';
import { Photo } from './photo.model';
import { User } from './user/user.model';
import { applyDateNow, applyNewId } from './utils';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class ChatMember {
  @prop({ default: applyNewId })
  member_id: mongoose.Types.ObjectId;

  @prop({ ref: () => User, required: true })
  user_id: Ref<User>;

  @prop({ required: true })
  is_admin: boolean;

  @prop({ default: null })
  nickname: string;

  @prop({ default: applyDateNow })
  joined_date: number;

  @prop({ default: null })
  seen: mongoose.Types.ObjectId;
}

@modelOptions({})
export class Chat {
  @prop({ required: true })
  title: string;

  @prop({ default: null })
  chat_photo: Photo;

  @prop({ ref: () => User, required: true })
  creator_id: Ref<User>;

  @prop({ type: [ChatMember], required: true }, PropType.ARRAY)
  members: mongoose.Types.Array<ChatMember>;

  @prop({ ref: () => MessageBucket, default: [] }, PropType.ARRAY)
  bucket_ids: Ref<MessageBucket>[];

  checkIsMember(this: ChatDoc, userId: string) {
    return Boolean(
      this.members.findIndex((member) => member.user_id.toString() === userId),
    );
  }
}

export type ChatDoc = DocumentType<Chat>;
export type ChatModel = ReturnModelType<typeof Chat>;
