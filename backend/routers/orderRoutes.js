const express = require("express");
const router = express.Router();
const { userAuth, adminAuth } = require("../middleware/OrderAuthMiddleware");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

// 🛍️ Tạo đơn hàng (User)
router.post("/", userAuth, createOrder);

// 📦 Lấy đơn hàng của user (User có thể xem đơn hàng của chính mình)
router.get("/user/:userId", userAuth, getUserOrders);

// 🔍 Lấy chi tiết đơn hàng (Cả user & admin đều xem được đơn hàng)
router.get("/detail/:id", userAuth, getOrderById);

// 📋 Lấy tất cả đơn hàng (Chỉ Admin)
router.get("/", adminAuth, getAllOrders);

// ⚙️ Cập nhật trạng thái đơn hàng (Chỉ Admin)
router.put("/:id", adminAuth, updateOrder);

// 🗑️ Xóa đơn hàng (Chỉ Admin)
router.delete("/:id", adminAuth, deleteOrder);

module.exports = router;
