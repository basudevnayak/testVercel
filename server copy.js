import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Cache MongoDB connection
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    }).then(mongoose => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

// Schema
const itemSchema = new mongoose.Schema({
  name: String
}, { timestamps: true });
const Item = mongoose.model('Item', itemSchema);

// Routes
app.get('/api/items', async (req, res) => {
  try {
    await connectDB();
    const items = await Item.find().limit(100); // Add limits
    res.set('Cache-Control', 's-maxage=60'); // Add caching
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add other routes similarly...

export default app;