import { AutoMap } from '@automapper/classes';
import mongoose, { Types } from 'mongoose';

export const applyDefault = () => ({});

export const applyDateNow = () => Date.now();

export const applyNewId = () => new mongoose.Types.ObjectId();

export class DocumentCT {
  @AutoMap()
  _id: Types.ObjectId;

  @AutoMap()
  __v: string;
}
