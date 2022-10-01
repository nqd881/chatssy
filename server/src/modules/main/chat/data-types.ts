import { PickSchema } from '@modules/extra/database';
import { Chat } from '@modules/extra/database/schemas';

export type CreateNewChatData = PickSchema<
  Chat,
  ['name', 'private', 'creator'][number],
  'avatar_url'
> & { members: string[] };
