const express = require("express");
const {
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
  createOrder,
} = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware"); // Middleware bảo vệ route

const router = express.Router();

// 🛒 Quản lý giỏ hàng
router.post("/add", protect, addToCart); // Thêm sản phẩm vào giỏ hàng
router.put("/update", protect, updateCart); // Cập nhật số lượng sản phẩm
router.delete("/remove", protect, removeFromCart); // Xóa một sản phẩm khỏi giỏ hàng
router.delete("/clear", protect, clearCart); // Xóa toàn bộ giỏ hàng

// 🛍️ Đặt hàng từ giỏ hàng
router.post("/checkout", protect, createOrder); // Tạo đơn hàng từ giỏ hàng

module.exports = router;
