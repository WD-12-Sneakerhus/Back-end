const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true }, // Đổi từ "name" thành "fullname"
    username: { type: String, required: true, unique: true }, // Bổ sung username
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" }, // Mặc định là user
  },
  { timestamps: true }
);

// Tạo JWT token
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.role === "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = mongoose.model("User", userSchema);
