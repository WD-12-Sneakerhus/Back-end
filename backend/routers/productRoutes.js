const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadImage");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Route tạo sản phẩm với upload ảnh
router.post("/", upload.array("images", 5), createProduct); // Tối đa 5 ảnh

// Route cập nhật sản phẩm, hỗ trợ update ảnh
router.put("/:id", upload.array("images", 5), updateProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

module.exports = router;
