import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Minimal test route
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// Connect to MongoDB Atlas
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
