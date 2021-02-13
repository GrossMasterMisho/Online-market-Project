const User = require("../models/user");

module.exports = {
  getProducts: async (id) => {
    const user = await User.findById(id).populate("cart").exec();
    const cart = user.cart;
    return [
      ...cart.map((product) => ({
        ...product.toObject(),
        img: {
          contentType: product.img.contentType,
          data: product.img.data.toString("base64"),
        },
      })),
    ];
  },

  deleteProductFromCart: async (userId, productId) => {
    return await User.updateOne(
      { _id: userId },
      { $pullAll: { cart: [productId] } }
    );
  },

  deleteAll: async (id) => {
    return await User.updateOne({ _id: id }, { $set: { cart: [] } });
  },
};
