import { modelOptions, prop, PropType } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export enum DbUserChatStates {
  STARTED = 'started',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

@modelOptions({
  schemaOptions: {
    _id: false,
    versionKey: false,
  },
})
export class DbUserChat {
  @prop({ required: true })
  chatId: Types.ObjectId;

  @prop({ enum: DbUserChatStates })
  state: DbUserChatStates;
}

@modelOptions({})
export class DbUserChats {
  @prop({ required: true, unique: true })
  userId: Types.ObjectId;

  @prop({ required: true, default: 0 })
  totalCount: number;

  @prop({ type: () => [DbUserChat] }, PropType.ARRAY)
  chats: DbUserChat[];
}
