import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Chat } from '../chat.model';

export enum UserChatStates {
  STARTED = 'started',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class UserChat {
  @prop({ ref: () => Chat, required: true })
  chat_id: Ref<Chat>;

  @prop({ enum: UserChatStates })
  state: UserChatStates;
}
