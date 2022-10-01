import mongoose from 'mongoose';

export const isValidObjectId = (candidateId: string) => {
  try {
    const convertedId = String(new mongoose.Types.ObjectId(candidateId));
    return convertedId == candidateId;
  } catch {
    return false;
  }
};
