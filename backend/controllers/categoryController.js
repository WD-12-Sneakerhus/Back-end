const Category = require("../models/Category");

// Lấy danh sách danh mục (chỉ hiển thị danh mục có status = true)
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Thêm danh mục mới
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: "Danh mục đã được thêm", category });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Cập nhật trạng thái danh mục (Ẩn/Hiện)
exports.updateCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });

    category.status = !category.status; // Đảo trạng thái
    await category.save();
    res.json({ message: "Cập nhật trạng thái thành công", category });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};
