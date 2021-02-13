const cartService = require("../services/cartService");

module.exports = {
  getProducts: async (req, res) => {
    if (!req.user) return;
    const cart = await cartService.getProducts(req.user._id);
    if (cart) {
      res.json(cart);
    } else {
      res.json([]);
    }
  },

  deleteProductFromCart: async (req, res) => {
    const deleted = await cartService.deleteProductFromCart(
      req.user.id,
      req.params.id
    );
    if (deleted.nModified === 1) {
      res.status(200).send("removed");
    } else {
      res.status(400).send("Can't delete product");
    }
  },

  deleteAll: async (req, res) => {
    const deleted = await cartService.deleteAll(req.user._id);
    if (deleted.ok === 1) {
      res.redirect(303, "/");
    } else {
      res.status(400).send("Something went wrong");
    }
  },
};
