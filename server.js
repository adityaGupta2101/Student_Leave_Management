const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const leaveRoutes = require("./routes/leaveRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Register routes AFTER creating app
app.use("/api/leaves", leaveRoutes);

app.get("/", (req, res) => {
  res.send("Student Leave Management API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});