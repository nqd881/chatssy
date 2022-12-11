import { modelOptions, prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import { DbWebPage } from '../../webpage.model';
import { DbMessageContentBase } from './base';

@modelOptions({})
export class DbMessageContentText extends DbMessageContentBase {
  @prop({ required: true })
  text: string;

  @Type(() => DbWebPage)
  @prop({ default: null })
  webpage: DbWebPage;
}
