// lib/db.js
import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://basudevnayak31:OPOgFhSnU8pb1x2x@cluster0.exfu446.mongodb.net/investationTeam?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return { conn: mongoose };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
