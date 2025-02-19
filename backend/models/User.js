const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);
