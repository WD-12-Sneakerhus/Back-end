const mongoose = require("mongoose");
const OrderHistorySchema = new mongoose.Schema(
  {
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order_status: { type: mongoose.Schema.Types.ObjectId, ref: "OrderStatus" },
    from_status: String,
    note: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderHistory", OrderHistorySchema);
