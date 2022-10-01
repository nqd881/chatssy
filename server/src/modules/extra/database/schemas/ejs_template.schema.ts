import { Prop, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { buildModuleDefinition } from '../buildModuleDefinition';
import { GetDocumentType } from '../types';

@Schema()
export class EjsTemplate {
  @Prop({ requried: true, unique: true, index: true })
  name: string;

  @Prop()
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

export const { moduleDefinition: EjsTemplateMD } =
  buildModuleDefinition(EjsTemplate);

export type EjsTemplateDocument = GetDocumentType<EjsTemplate>;
export type EjsTemplateModel = Model<EjsTemplateDocument>;
