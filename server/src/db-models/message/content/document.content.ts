import { modelOptions, prop } from '@typegoose/typegoose';
import { DbDocument } from '../../document.model';

@modelOptions({})
export class DbDocumentContent {
  @prop({ required: true })
  document: DbDocument;

  @prop({ default: null })
  caption: string;
}
