const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/voucherController");

router.get("/", voucherController.getAllVouchers);
router.post("/", voucherController.createVoucher);
router.put("/:id", voucherController.updateVoucher);
router.delete("/:id", voucherController.deleteVoucher);
router.patch("/:id/toggle-status", voucherController.toggleVoucherStatus);

module.exports = router;
