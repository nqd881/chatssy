import { MessageDocumentContent } from './document.content';
import { MessagePhotoContent } from './photo.content';
import { MessageTextContent } from './text.content';

export enum MessageContentTypes {
  TEXT = 'text',
  PHOTO = 'photo',
  DOCUMENT = 'document',
}

export type MessageContent =
  | MessageTextContent
  | MessagePhotoContent
  | MessageDocumentContent;
