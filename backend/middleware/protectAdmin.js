const jwt = require("jsonwebtoken");
const Admin = require("./models/AdminModel");

const protectAdmin = async (req, res, next) => {
  let token;

  // Kiểm tra xem request có token không
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm admin từ token
      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) {
        return res.status(401).json({ message: "Không có quyền truy cập" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Không có token, quyền truy cập bị từ chối" });
  }
};

module.exports = protectAdmin;
