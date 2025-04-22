import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// MongoDB connection
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected:", connection.connection.host);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process with failure
  }
};

// CORS configuration
app.use(cors({
  origin: "https://hotel-backend-xi.vercel.app", // Your frontend URL
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true,
}));

app.use(express.json({ limit: "25mb" }));

// Test Route
app.get('/', (req, res) => {
  res.send("Hello hotel");
  console.log("Hello hotel");
});

// Start server function
const startServer = async () => {
  try {
    // Connect to MongoDB before starting the server
    await connectDB();

    app.listen(5000, () => {
      console.log("Server listening on http://localhost:5000");
    });
  } catch (err) {
    console.log("Error in starting the server:", err);
  }
};

startServer();
