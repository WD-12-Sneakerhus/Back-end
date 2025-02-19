const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    image_url: { type: String, required: true },
    image_order: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductImage", productImageSchema);
