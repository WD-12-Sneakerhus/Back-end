const mongoose = require("mongoose");
const FailedJobSchema = new mongoose.Schema(
  {
    uuid: String,
    connection: String,
    queue: String,
    payload: String,
    exception: String,
    failed_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FailedJob", FailedJobSchema);
