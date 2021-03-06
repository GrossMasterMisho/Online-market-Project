const productService = require("../services/productService");

module.exports = {
  uploadNewProduct: async (req, res, user) => {
    const result = productService.uploadNewProduct(req, user);
    result
      .then(() => {
        res.redirect("/");
      })
      .catch(() => res.status(400).send("can't add product"));
  },

  fetchAllProducts: async (req, res) => {
    const result = productService.fetchAllProducts();
    result
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => console.error(err));
  },

  addToCart: async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    const result = productService.addToCart(req.body.productId, req.user);
    result
      .then(() => {
        res.redirect("/");
      })
      .catch(() => res.status(400).send("can't add product"));
  },

  getProduct: async (req, res) => {
    const result = productService.getProduct(req.params.id);

    result
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => console.error(err));
  },

  searchProduct: async (req, res) => {
    const products = await productService.searchProduct(req.query.search);
    return res.json(products);
  },

  searchByCategory: async (req, res) => {
    const products = await productService.searchByCategory(req.query.category);
    return res.json(products);
  },
};
