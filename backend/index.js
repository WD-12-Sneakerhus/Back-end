require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Kết nối MongoDB
connectDB();

const app = express();
app.use(express.json()); // Cho phép nhận JSON request
app.use(cors()); // Cho phép truy cập API từ frontend

// Định nghĩa route test
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Import và sử dụng route
const userRoutes = require("./routers/userRoutes");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
