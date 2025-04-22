// api/products/[id].js
import { connectToDatabase } from '../../lib/db';
import Product from '../../lib/Product';

export default async function handler(req, res) {
  const { id } = req.query;
  await connectToDatabase();

  if (req.method === 'GET') {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  }

  if (req.method === 'PUT') {
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await Product.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).end();
}
