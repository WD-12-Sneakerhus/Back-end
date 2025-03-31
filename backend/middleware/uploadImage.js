const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu ảnh và đặt tên file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ảnh sẽ lưu trong thư mục uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file theo thời gian
  },
});

// Chỉ cho phép upload ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ được upload ảnh (JPG, PNG, WEBP)"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
