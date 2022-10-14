import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class UserPhone {
  @prop({ default: null })
  phone_number: string;

  @prop({ default: null })
  country: string;
}
