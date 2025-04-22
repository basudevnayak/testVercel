import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Connect to MongoDB once globally
let conn = null;
async function connectDB() {
  if (conn == null) {
    conn = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await conn;
    console.log('✅ MongoDB connected');
  }
}

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
  await connectDB();
  return next();
});

// Routes
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// You can add more routes like /:id, PUT, DELETE, etc.

// Export as Vercel serverless handler
export default app;
