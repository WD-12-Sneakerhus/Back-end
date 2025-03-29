require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const userRoutes = require("./routers/userRoutes");
const productRoutes = require("./routers/productRoutes");
const orderRoutes = require("./routers/orderRoutes");
const cartRoutes = require("./routers/cartRoutes");
const categoryRoutes = require("./routers/categoryRouter");
const brandRoutes = require("./routers/brandRoutes");
const adminAuthRoutes = require("./routers/adminAuth");
const voucherRouter = require("./routers/voucherRoutes");
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Sử dụng routes
app.use("/api/admin", adminAuthRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/vouchers", voucherRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
