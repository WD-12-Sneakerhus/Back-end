const express = require("express");
const {
  getBrands,
  addBrand,
  updateBrandStatus,
} = require("../controllers/brandController");

const router = express.Router();

router.get("/", getBrands);
router.post("/", addBrand);
router.put("/:id/status", updateBrandStatus); // Cập nhật trạng thái

module.exports = router;
