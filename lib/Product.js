// lib/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
