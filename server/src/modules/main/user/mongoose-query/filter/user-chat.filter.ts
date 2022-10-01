import { Types } from 'mongoose';
import { createPropertyFilter } from '../create-property-filter';

export const UserChatFilter = createPropertyFilter<string | Types.ObjectId>(
  'chats._id',
);
