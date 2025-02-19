const mongoose = require("mongoose");
const DiscountSchema = new mongoose.Schema(
  {
    discount_code: String,
    description: String,
    start_date: Date,
    end_date: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discount", DiscountSchema);
