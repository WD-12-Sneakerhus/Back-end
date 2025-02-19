const mongoose = require("mongoose");
const PasswordResetTokenSchema = new mongoose.Schema(
  {
    email: String,
    token: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PasswordResetToken", PasswordResetTokenSchema);
