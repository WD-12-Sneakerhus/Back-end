import cloudinary from "../models/cloudinary.js"; // Thay đổi đường dẫn import
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    format: async () => "png",
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const upload = multer({ storage });

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Không có ảnh nào được tải lên" });
    }

    res.json({ imageUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tải ảnh lên", error });
  }
};

export { upload };
