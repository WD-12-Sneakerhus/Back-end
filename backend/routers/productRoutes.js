const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Routes
router.post("/", createProduct); // Thêm sản phẩm
router.get("/", getProducts); // Lấy danh sách sản phẩm
router.get("/:id", getProductById); // Lấy sản phẩm theo ID
router.put("/:id", updateProduct); // Cập nhật sản phẩm
router.delete("/:id", deleteProduct); // Xóa sản phẩm

module.exports = router;
