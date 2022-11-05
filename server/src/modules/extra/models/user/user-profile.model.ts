import { modelOptions, prop } from '@typegoose/typegoose';
import { Address } from '../address.model';
import { applyDefault } from '../utils';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class UserProfile {
  @prop({ required: true })
  first_name: string;

  @prop({ required: true })
  last_name: string;

  @prop({ default: null })
  birth_date: Date;

  @prop({ default: applyDefault })
  address: Address;
}
