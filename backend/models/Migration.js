const mongoose = require("mongoose");
const MigrationSchema = new mongoose.Schema(
  {
    migration: String,
    batch: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Migration", MigrationSchema);
