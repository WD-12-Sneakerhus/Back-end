const mongoose = require("mongoose");
const PersonalAccessTokenSchema = new mongoose.Schema(
  {
    tokenable_type: String,
    tokenable_id: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    token: String,
    abilities: String,
    last_used_at: Date,
    expires_at: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PersonalAccessToken",
  PersonalAccessTokenSchema
);
