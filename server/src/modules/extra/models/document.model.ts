import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';
import { File } from './file.model';

@modelOptions({})
export class Document {
  @prop({ required: true })
  file_name: string;

  @prop({ required: true })
  mime_type: string;

  @prop()
  thumbnail: File;

  @prop({ required: true })
  file: File;
}

export type DocumentDoc = DocumentType<Document>;
export type DocumentModel = ReturnModelType<typeof Document>;
