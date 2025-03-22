const express = require("express");
const {
  getCategories,
  addCategory,
  updateCategoryStatus,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);
router.put("/:id/status", updateCategoryStatus); // Cập nhật trạng thái

module.exports = router;
