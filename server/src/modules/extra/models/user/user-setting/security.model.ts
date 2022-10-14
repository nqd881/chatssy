import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class UserSettingSecurity {
  @prop({ default: false })
  tfa: boolean;
}
