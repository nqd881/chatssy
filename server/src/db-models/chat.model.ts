import {
  DocumentType,
  modelOptions,
  prop,
  PropType,
  ReturnModelType,
  Severity,
} from '@typegoose/typegoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { DbMessage } from './message';
import { DbPhoto } from './photo.model';
import { applyDateNow, MongoDoc } from './utils';

@modelOptions({
  schemaOptions: {
    versionKey: false,
    _id: false,
  },
})
export class ChatMemberStatus {}

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class DbChatMember extends MongoDoc {
  @prop({ required: true })
  userId: Types.ObjectId;

  @prop({ required: true })
  inviterId: Types.ObjectId;

  @prop({ required: true })
  isAdmin: boolean;

  @prop({ default: null })
  nickname: string;

  @prop({ default: applyDateNow })
  joinedDate: number;

  @prop({ default: null })
  lastMessageViewedId: Types.ObjectId;

  @prop()
  status: ChatMemberStatus;
}

@Expose()
@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
  schemaOptions: {
    versionKey: false,
  },
})
export class DbChat extends MongoDoc {
  @prop({ required: true })
  title: string;

  @prop({ default: null })
  photo: DbPhoto;

  @prop({ required: true })
  creatorId: Types.ObjectId;

  @Type(() => DbChatMember)
  @prop({ type: [DbChatMember], required: true }, PropType.ARRAY)
  members: DbChatMember[];

  @Exclude()
  @prop({ type: () => [Types.ObjectId], default: [] }, PropType.ARRAY)
  bucketIds: Types.ObjectId[];

  @Type(() => DbMessage)
  @prop({ default: null })
  lastMessage: DbMessage;

  checkIsMember(this: DbChatDoc, userId: string) {
    return Boolean(
      this.members.findIndex((member) => member.userId.toString() === userId),
    );
  }
}

export type DbChatDoc = DocumentType<DbChat>;
export type DbChatModel = ReturnModelType<typeof DbChat>;
