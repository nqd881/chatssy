import {
  DocumentType,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';

@modelOptions({})
export class EjsTemplate {
  @prop({ required: true, index: true, unique: true })
  name: string;

  @prop({ required: true })
  value: string;
}

export type EjsTemplateDoc = DocumentType<EjsTemplate>;
export type EjsTemplateModel = ReturnModelType<typeof EjsTemplate>;
