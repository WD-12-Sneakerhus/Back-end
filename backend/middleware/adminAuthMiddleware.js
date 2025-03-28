const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kiểm tra quyền admin
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Không có quyền truy cập!" });
      }

      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Không được phép truy cập!" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Không có token!" });
  }
};

module.exports = { protectAdmin };
