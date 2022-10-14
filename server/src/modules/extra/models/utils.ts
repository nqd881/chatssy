import mongoose, { SchemaTimestampsConfig } from 'mongoose';

export const applyDefault = () => ({});

export const applyDateNow = () => Date.now();

export const applyNewId = () => new mongoose.Types.ObjectId();

export const timestampsSchemaConfig: SchemaTimestampsConfig = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};
