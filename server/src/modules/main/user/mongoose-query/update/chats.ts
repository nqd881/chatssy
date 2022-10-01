import { UserChatStates, UserDocument } from '@modules/extra/database/schemas';
import { UpdateQuery } from 'mongoose';

export const AddChatQuery = (chatId: string): UpdateQuery<UserDocument> => ({
  $push: {
    chats: {
      chat_id: chatId,
      state: UserChatStates.STARTED,
    },
  },
});

export const UpdateChatQuery = (state: UserChatStates) => ({
  'chats.$.state': state,
});
