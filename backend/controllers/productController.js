const Product = require("../models/Product");

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const { name, brand, category, price, variants, images, description } =
      req.body;

    const product = new Product({
      name,
      brand,
      category,
      price,
      variants,
      images,
      description,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Lấy danh sách sản phẩm
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category") // Đổi từ cate_id thành category
      .populate("brand"); // Đổi từ brand_id thành brand
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("brand");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const { name, brand, category, price, variants, images, description } =
      req.body;

    // Kiểm tra các trường bắt buộc (có thể bỏ qua images và variants nếu không bắt buộc)
    if (
      !name ||
      !brand ||
      typeof brand !== "object" ||
      !category ||
      typeof category !== "object" ||
      !price ||
      isNaN(price) ||
      !description
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be valid" });
    }

    // Kiểm tra brand và category có đúng dạng Object không
    if (typeof brand !== "object" || typeof category !== "object") {
      return res
        .status(400)
        .json({ message: "Brand and category must be objects" });
    }

    // Kiểm tra variants và images phải là mảng hợp lệ (nếu có)
    if (variants && !Array.isArray(variants)) {
      return res.status(400).json({ message: "Variants must be an array" });
    }
    if (images && !Array.isArray(images)) {
      return res.status(400).json({ message: "Images must be an array" });
    }

    // Tìm và cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        brand, // Giữ nguyên object thay vì ObjectId
        category, // Giữ nguyên object thay vì ObjectId
        price,
        variants,
        images,
        description,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
