import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { DbChat } from '../chat.model';

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
  @prop({ ref: () => DbChat, required: true })
  chatId: Ref<DbChat>;

  @prop({ enum: DbUserChatStates })
  state: DbUserChatStates;
}
