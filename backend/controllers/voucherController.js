const Voucher = require("../models/Voucher");

// Lấy danh sách voucher
exports.getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Tạo voucher mới
exports.createVoucher = async (req, res) => {
  try {
    const newVoucher = new Voucher(req.body);
    await newVoucher.save();
    res
      .status(201)
      .json({ message: "Voucher đã được tạo", voucher: newVoucher });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi tạo voucher", error });
  }
};

// Cập nhật voucher
exports.updateVoucher = async (req, res) => {
  try {
    const updatedVoucher = await Voucher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVoucher)
      return res.status(404).json({ message: "Voucher không tồn tại" });
    res.json({
      message: "Cập nhật voucher thành công",
      voucher: updatedVoucher,
    });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật", error });
  }
};

// Xóa voucher
exports.deleteVoucher = async (req, res) => {
  try {
    await Voucher.findByIdAndDelete(req.params.id);
    res.json({ message: "Voucher đã bị xóa" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi xóa voucher", error });
  }
};

// Kích hoạt / Vô hiệu hóa voucher
exports.toggleVoucherStatus = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher)
      return res.status(404).json({ message: "Voucher không tồn tại" });

    voucher.isActive = !voucher.isActive;
    await voucher.save();
    res.json({ message: "Cập nhật trạng thái voucher thành công", voucher });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật trạng thái", error });
  }
};
