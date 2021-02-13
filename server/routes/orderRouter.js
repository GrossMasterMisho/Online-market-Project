const orderController = require("../controllers/orderController");
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
  res.sendFile(public + "/orders.html");
});

router.get("/list", function (req, res) {
  orderController.getOrders(req, res);
});

router.post("/", function (req, res) {
  orderController.addOrders(req, res);
});

module.exports = router;
