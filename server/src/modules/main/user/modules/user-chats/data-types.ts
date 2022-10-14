import { UserChat } from '@modules/extra/models/user/user-chat.model';

export type UpdateUserChatData = Pick<UserChat, 'state'>;
