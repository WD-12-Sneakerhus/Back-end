const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/adminModel");

// Middleware xác thực người dùng
const userAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "Người dùng không tồn tại!" });
      }
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Token không hợp lệ!" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Không có token, từ chối truy cập!" });
  }
};

// Middleware xác thực Admin
const adminAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) {
        return res
          .status(401)
          .json({ success: false, message: "Admin không tồn tại!" });
      }
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Token không hợp lệ!" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Không có token, từ chối truy cập!" });
  }
};

module.exports = { userAuth, adminAuth };
