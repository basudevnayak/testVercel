// api/products/index.js
import { connectToDatabase } from '../../lib/db';
import Product from '../../lib/Product';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const products = await Product.find();
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    await product.save();
    return res.status(201).json(product);
  }

  res.status(405).end(); // Method Not Allowed
}
