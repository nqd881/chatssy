import { Request } from 'express';
import { CreateNewChatData } from '../data-types';
import { CreateNewChatPayload } from '../validations';

export const parseCreateChatPayload = (
  value: CreateNewChatPayload,
  req: Request,
): CreateNewChatData => {
  const creator = req.session.user.id;
  const members = [...new Set([...value.members, creator])];

  return { ...value, creator, members };
};
