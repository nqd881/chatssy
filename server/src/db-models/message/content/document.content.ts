import { modelOptions, prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import { DbDocument } from '../../document.model';
import { DbMessageContentBase } from './base';

@modelOptions({})
export class DbMessageContentDocument extends DbMessageContentBase {
  @Type(() => DbDocument)
  @prop({ required: true })
  document: DbDocument;

  @prop({ default: null })
  caption: string;
}
