const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  _productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("orderHistory", orderHistorySchema);
