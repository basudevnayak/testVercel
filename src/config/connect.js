import mongoose from 'mongoose';
import { DATABASE_URL } from './index.js';

let isConnected = false;

export const connect = async () => {
  if (isConnected) return;
  await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
};
