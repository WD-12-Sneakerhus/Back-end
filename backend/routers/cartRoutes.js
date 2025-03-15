const express = require("express");
const {
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addToCart);
router.put("/update", protect, updateCart);
router.delete("/remove", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

module.exports = router;
