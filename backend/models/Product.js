const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    primary_image_url: { type: String },
    content: { type: String },
    price: { type: Number, required: true },
    price_sale: { type: Number },
    quantity: { type: Number, required: true },
    cate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
