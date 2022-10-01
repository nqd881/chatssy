import { UserChat } from '@modules/extra/database/schemas';

export type UpdateUserChatData = Pick<UserChat, 'state'>;
