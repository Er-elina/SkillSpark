const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
  },
  brand: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  countInStock: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  numReviews: {
    type: Number,
  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;