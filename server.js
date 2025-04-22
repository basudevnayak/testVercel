import mongoose from 'mongoose';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Connection caching
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI not set');
  }

  cached.promise ||= mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,       // Disable buffering
    serverSelectionTimeoutMS: 3000, // 3s timeout
    socketTimeoutMS: 45000       // 45s socket timeout
  });

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

// Optimized handler
export default async function handler(req, res) {
  try {
    const db = await Promise.race([
      connectDB(),
      new Promise((_, reject) =>
        setTimeout(() => reject('Connection timeout'), 2500)
      )
    ]);

    const items = await db.model('Item')
      .find()
      .select('_id name')        // Only return needed fields
      .limit(50)                 // Limit results
      .lean()                    // Faster JSON conversion
      .maxTimeMS(3000);          // Query timeout

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json(items);
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ 
      error: err.message || 'Request timed out',
      code: 'TIMEOUT_ERROR'
    });
  }
}