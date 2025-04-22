// import mongoose from 'mongoose';

// export const connect = (url) => {
//   return mongoose.connect(url);
// };
import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URL

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// Global is used here to maintain a cached connection across function calls
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}
