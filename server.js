import { connect } from './src/config/connect.js';
import { authRoutes, VariablesRoutes } from './src/routes/index.js';

export default async function handler(req, res) {
  await connect();

  if (req.url.startsWith('/api/auth')) {
    return authRoutes(req, res);
  }

  if (req.url.startsWith('/api/variables')) {
    return VariablesRoutes(req, res);
  }

  return res.status(200).send('Welcome to the Vercel Serverless API');
}
