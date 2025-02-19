const mongoose = require("mongoose");

const OrderDetailSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: String,
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderDetail", OrderDetailSchema);
