const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); // Thêm import jwt

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    email_verified_at: { type: Date, default: null },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    remember_token: { type: String },
  },
  { timestamps: true }
);

// Tạo JWT token
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = mongoose.model("User", userSchema);
