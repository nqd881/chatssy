import { modelOptions, prop } from '@typegoose/typegoose';
import { WebPage } from '../../webpage.model';

@modelOptions({})
export class MessageTextContent {
  @prop({ required: true })
  text: string;

  @prop({ default: null })
  webpage: WebPage;
}
