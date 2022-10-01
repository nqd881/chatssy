import { Prop, Schema } from '@nestjs/mongoose';
import { Model, SchemaTypes, Types } from 'mongoose';
import { buildModuleDefinition } from '../buildModuleDefinition';
import { GetDocumentType } from '../types';

@Schema()
export class VerificationToken {
  @Prop({
    type: SchemaTypes.ObjectId,
    index: true,
    ref: 'User',
    required: true,
  })
  user_id: Types.ObjectId;

  @Prop({ requried: true })
  type: string;

  @Prop({ require: true })
  value: string;

  @Prop({ requried: true })
  expired_at: Date;
}

export const { moduleDefinition: VerificationTokenMD } =
  buildModuleDefinition(VerificationToken);

export type VerificationTokenDocument = GetDocumentType<VerificationToken>;
export type VerificationTokenModel = Model<VerificationTokenDocument>;
