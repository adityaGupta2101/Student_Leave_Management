const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load Environment Variables
const result = dotenv.config();

if (result.error) {
  console.error("❌ Error loading .env file:");
  console.error(result.error);
} else {
  console.log("✅ .env loaded successfully");
}

console.log("JWT_SECRET =", process.env.JWT_SECRET);

const connectDB = require("./config/db");

const leaveRoutes = require("./routes/leaveRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/leaves", leaveRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Student Leave Management API is Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});