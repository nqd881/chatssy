import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose';
import mongoose, { Types } from 'mongoose';
import { DbMessageBucket } from './message-bucket.model';
import { DbPhoto } from './photo.model';
import { DbUser } from './user/user.model';
import { applyDateNow, applyNewId } from './utils';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class ChatMemberStatus {}

@modelOptions({})
export class ChatMember {
  @prop({ ref: () => DbUser, required: true })
  userId: Ref<DbUser>;

  @prop({ ref: () => DbUser, required: true })
  inviterId: Ref<DbUser>;

  @prop({ required: true })
  isAdmin: boolean;

  @prop({ default: null })
  nickname: string;

  @prop({ default: applyDateNow })
  joinedDate: number;

  @prop({ default: null })
  lastMessageViewedId: mongoose.Types.ObjectId;

  @prop()
  status: ChatMemberStatus;
}

@modelOptions({})
export class DbChat {
  @prop({ required: true })
  title: string;

  @prop({ default: null })
  photo: DbPhoto;

  @prop({ required: true })
  creatorId: Types.ObjectId;

  @prop({ type: [ChatMember], required: true }, PropType.ARRAY)
  members: mongoose.Types.Array<ChatMember>;

  @prop({ ref: () => DbMessageBucket, default: [] }, PropType.ARRAY)
  bucketIds: Ref<DbMessageBucket>[];

  checkIsMember(this: DbChatDoc, userId: string) {
    return Boolean(
      this.members.findIndex((member) => member.userId.toString() === userId),
    );
  }
}

export type DbChatDoc = DocumentType<DbChat>;
export type DbChatModel = ReturnModelType<typeof DbChat>;
