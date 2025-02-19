const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import models
const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Brand = require("./models/Brand");

// Load biến môi trường từ .env
dotenv.config();

// Kết nối database
connectDB();

// Dữ liệu mẫu
const users = [
  {
    fullname: "Admin User",
    username: "admin",
    email: "admin@example.com",
    password: "123456", // Lưu ý: Khi triển khai thực tế, cần mã hóa mật khẩu
    role: "admin",
  },
  {
    fullname: "Test User",
    username: "testuser",
    email: "test@example.com",
    password: "123456",
    role: "user",
  },
];

const categories = [
  { name: "Electronics", image: "electronics.jpg" },
  { name: "Fashion", image: "fashion.jpg" },
];

const brands = [{ name: "Apple" }, { name: "Samsung" }];

const products = [
  {
    title: "iPhone 13 Pro Max",
    description: "Newest Apple iPhone",
    primary_image_url: "iphone13.jpg",
    content: "This is a description of the iPhone 13 Pro Max",
    price: 1200.99,
    price_sale: 1100.99,
    quantity: 50,
    cate_id: null, // Gán sau khi insert categories
    brand_id: null, // Gán sau khi insert brands
  },
];

// **Hàm insert dữ liệu**
const importData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Brand.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdCategories = await Category.insertMany(categories);
    const createdBrands = await Brand.insertMany(brands);

    // Gán category & brand ID vào sản phẩm
    products[0].cate_id = createdCategories[0]._id;
    products[0].brand_id = createdBrands[0]._id;

    await Product.insertMany(products);

    console.log("✅ Dữ liệu đã được import!");
    process.exit();
  } catch (error) {
    console.error("❌ Lỗi import dữ liệu:", error);
    process.exit(1);
  }
};

// **Chạy import**
importData();
