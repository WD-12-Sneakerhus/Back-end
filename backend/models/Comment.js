const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
