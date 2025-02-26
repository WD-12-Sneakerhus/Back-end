const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

// Routes
router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
