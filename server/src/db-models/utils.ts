import mongoose from 'mongoose';

export const applyDefault = () => ({});

export const applyDateNow = () => Date.now();

export const applyNewId = () => new mongoose.Types.ObjectId();
