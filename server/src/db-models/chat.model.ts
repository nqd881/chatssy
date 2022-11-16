import { AutoMap } from '@automapper/classes';
import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import {
  DbDocumentMessage,
  DbMessage,
  DbMessageBase,
  DbTextMessage,
} from './message';
import { DbPhoto } from './photo.model';
import { applyDateNow, DocumentCT } from './utils';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class ChatMemberStatus {}

@modelOptions({})
export class DbChatMember {
  @AutoMap()
  @prop({ required: true })
  userId: Types.ObjectId;

  @AutoMap()
  @prop({ required: true })
  inviterId: Types.ObjectId;

  @AutoMap()
  @prop({ required: true })
  isAdmin: boolean;

  @AutoMap()
  @prop({ default: null })
  nickname: string;

  @AutoMap()
  @prop({ default: applyDateNow })
  joinedDate: number;

  @AutoMap()
  @prop({ default: null })
  lastMessageViewedId: Types.ObjectId;

  @AutoMap()
  @prop()
  status: ChatMemberStatus;
}

@modelOptions({})
export class DbChat extends DocumentCT {
  @AutoMap()
  @prop({ required: true })
  title: string;

  @AutoMap()
  @prop({ default: null })
  photo: DbPhoto;

  @AutoMap()
  @prop({ required: true })
  creatorId: Types.ObjectId;

  @AutoMap(() => DbChatMember)
  @prop({ type: [DbChatMember], required: true }, PropType.ARRAY)
  members: Types.Array<DbChatMember>;

  @prop({ type: () => [Types.ObjectId], default: [] }, PropType.ARRAY)
  bucketIds: Types.Array<Types.ObjectId>;

  checkIsMember(this: DbChatDoc, userId: string) {
    return Boolean(
      this.members.findIndex((member) => member.userId.toString() === userId),
    );
  }
}

export type DbChatDoc = DocumentType<DbChat>;
export type DbChatModel = ReturnModelType<typeof DbChat>;
