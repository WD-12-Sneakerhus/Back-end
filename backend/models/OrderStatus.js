const mongoose = require("mongoose");
const OrderStatusSchema = new mongoose.Schema(
  {
    status_name: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderStatus", OrderStatusSchema);
