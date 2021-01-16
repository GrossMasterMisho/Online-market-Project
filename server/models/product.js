const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  img: { data: Buffer, contentType: String },
  name: { type: String, required: true },
  description: { type: String },
  // phone: { type: String, required: true },
  // address: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
