import { DbUserChat } from 'src/db-models/user/user-chat.model';

export type UpdateUserChatData = Pick<DbUserChat, 'state'>;
