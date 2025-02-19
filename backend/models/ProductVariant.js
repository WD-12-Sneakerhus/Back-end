const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  size_id: { type: mongoose.Schema.Types.ObjectId, ref: "Size" },
  color_id: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("ProductVariant", productVariantSchema);
