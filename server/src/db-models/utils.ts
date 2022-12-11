import { Expose } from 'class-transformer';
import mongoose, { Types } from 'mongoose';

export const applyDefault = () => ({});

export const applyDateNow = () => Date.now();

export const applyNewId = () => new mongoose.Types.ObjectId();

export class MongoDoc {
  @Expose({ name: 'id', toPlainOnly: true })
  _id: Types.ObjectId;
}
