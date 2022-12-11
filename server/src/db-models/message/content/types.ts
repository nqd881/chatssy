import { DbMessageContentDocument } from './document.content';
import { DbMessageContentPhoto } from './photo.content';
import { DbMessageContentText } from './text.content';

export type DbMessageContent =
  | DbMessageContentText
  | DbMessageContentDocument
  | DbMessageContentPhoto;
