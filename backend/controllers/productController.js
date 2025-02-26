const Product = require("../models/Product");

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      primary_image_url,
      content,
      price,
      price_sale,
      quantity,
      cate_id,
      brand_id,
    } = req.body;
    const newProduct = new Product({
      title,
      description,
      primary_image_url,
      content,
      price,
      price_sale,
      quantity,
      cate_id,
      brand_id,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Lấy danh sách sản phẩm
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("cate_id")
      .populate("brand_id");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("cate_id")
      .populate("brand_id");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);
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
