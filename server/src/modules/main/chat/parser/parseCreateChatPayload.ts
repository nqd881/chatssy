import { Request } from 'express';
import { CreateNewChatData } from '../data-types';
import { CreateNewChatPayload } from '../validations';

export const parseCreateChatPayload = (
  value: CreateNewChatPayload,
  req: Request,
): CreateNewChatData => {
  const creator_id = req.session.user.id;
  const members = [...new Set([...value.members, creator_id])];

  return { ...value, creator_id, members };
};
