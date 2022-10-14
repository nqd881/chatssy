import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class UserSettingLanguage {
  @prop({ default: 'en' })
  base_language: string;
}
