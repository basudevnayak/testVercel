import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const app = express();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error", err);
  }
};

await connectDB(); // connect outside of handler

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Vercel with serverless HTTP!");
});

// ⛔ DO NOT call app.listen()
// ✅ EXPORT handler for Vercel
export const handler = serverless(app);
