const mongoose = require("mongoose");

const productschema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Price: { type: Number, required: true },
    Description: { type: String, required: true },
    Inventry: { type: Number, required: true },
    // Admin_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    // Manager_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("product", productschema);

module.exports = Product;
