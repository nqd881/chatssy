import { modelOptions, prop } from '@typegoose/typegoose';
import { Document } from '../../document.model';

@modelOptions({})
export class DocumentContent {
  @prop({ required: true })
  document: Document;

  @prop({ default: null })
  caption: string;
}
