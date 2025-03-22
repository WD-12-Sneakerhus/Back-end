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

// Import và sử dụng các routes
const userRoutes = require("./routers/userRoutes");
const productRoutes = require("./routers/productRoutes");
const orderRoutes = require("./routers/orderRoutes");
const cartRoutes = require("./routers/cartRoutes");
const categoryRoutes = require("./routers/categoryRouter");
const brandRoutes = require("./routers/brandRoutes");

app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
