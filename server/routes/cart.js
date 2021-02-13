const User = require("../models/user");
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

  // User.findById(req.user._id, function (err, user) {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   res.status(200).send(user.cart);
  // });
});

router.get("/products", function (req, res) {
  if (!req.user) return;
  const cart = req.user.cart;
  return res.json(cart);
});

module.exports = router;
