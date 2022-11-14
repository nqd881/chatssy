import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';
import { DbFile } from './file.model';

@modelOptions({})
export class DbDocument {
  @prop({ required: true })
  fileName: string;

  @prop({ required: true })
  mimeType: string;

  @prop({ default: null })
  thumbnail: DbFile;

  @prop({ required: true })
  file: DbFile;
}

export type DbDocumentDoc = DocumentType<DbDocument>;
export type DbDocumentModel = ReturnModelType<typeof DbDocument>;
