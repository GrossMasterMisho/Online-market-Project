const cartController = require("../controllers/cartController");
const express = require("express");
const router = express.Router();
const { public } = require("../config/config");

router.all("*", function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
});

router.get("/", function (req, res) {
  res.sendFile(public + "/shoppingCart.html");
});

router.get("/products", function (req, res) {
  cartController.getProducts(req, res);
});

router.delete("/delete/:id", function (req, res) {
  cartController.deleteProductFromCart(req, res);
});

router.delete("/deleteAll", function (req, res) {
  cartController.deleteAll(req, res);
});

module.exports = router;
