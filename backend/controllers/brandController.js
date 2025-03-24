const Brand = require("../models/Brand");

// Lấy danh sách thương hiệu (chỉ hiển thị thương hiệu có status = true)
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find(); // Chỉ lấy thương hiệu đang hoạt động

    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Thêm thương hiệu mới
exports.addBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brand = new Brand({ name });
    await brand.save();
    res.status(201).json({ message: "Thương hiệu đã được thêm", brand });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Cập nhật trạng thái thương hiệu (Ẩn/Hiện)
exports.updateBrandStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand)
      return res.status(404).json({ message: "Không tìm thấy thương hiệu" });

    brand.status = !brand.status; // Đảo trạng thái
    await brand.save();
    res.json({ message: "Cập nhật trạng thái thành công", brand });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};
