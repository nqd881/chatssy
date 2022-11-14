import { modelOptions, prop } from '@typegoose/typegoose';
import { DbWebPage } from '../../webpage.model';

@modelOptions({})
export class DbTextContent {
  @prop({ required: true })
  text: string;

  @prop({ default: null })
  webpage: DbWebPage;
}
