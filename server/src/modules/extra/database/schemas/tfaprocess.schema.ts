import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, SchemaTypes } from 'mongoose';
import { GetDocumentType } from '../types';

@Schema()
export class TfaProcess {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user_id: string;

  @Prop()
  time: number;

  @Prop()
  code: string;

  @Prop()
  limit: number;
}

export const TfaProcessSchema = SchemaFactory.createForClass(TfaProcess);

export const TfaProcessMD: ModelDefinition = {
  name: TfaProcess.name,
  schema: TfaProcessSchema,
};

export type TfaProcessDocument = GetDocumentType<TfaProcess>;
export type TfaProcessModel = Model<TfaProcessDocument>;
