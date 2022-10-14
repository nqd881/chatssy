import { Chat } from '@modules/extra/models/chat.model';
import { UserChat } from '@modules/extra/models/user/user-chat.model';

export type UserChatDetails = UserChat & { info: Chat };
