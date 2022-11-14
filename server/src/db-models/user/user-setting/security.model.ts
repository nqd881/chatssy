import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class DbUserSettingSecurity {
  @prop({ default: false })
  tfa: boolean;
}
