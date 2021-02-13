const orderHistory = require("../models/orderHistory");

module.exports = {
  getOrders: async (id) => {
    const achi = await orderHistory
      .find({
        _userId: id,
      })
      .populate({
        path: "_productId",
      })
      .exec();

    return [
      ...achi.map((prod) => {
        const product = prod._productId;
        return {
          ...product.toObject(),
          img: {
            contentType: product.img.contentType,
            data: product.img.data.toString("base64"),
          },
          quantity: prod.quantity,
        };
      }),
    ];
  },

  addOrders: async (products, userId) => {
    const orders = [
      ...products.map((product) => ({
        _userId: userId,
        _productId: product.id,
        quantity: product.value,
      })),
    ];

    return await orderHistory.insertMany(orders);
  },
};
