import { Prop, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { buildModuleDefinition } from '../buildModuleDefinition';
import { GetDocumentType } from '../types';

@Schema()
export class File {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ext: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  url: string;

  @Prop({ default: false })
  uploaded: boolean;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ default: null })
  put_url: string;
}

export const { moduleDefinition: FileMD } = buildModuleDefinition(File);

export type FileDocument = GetDocumentType<File>;
export type FileModel = Model<FileDocument>;
