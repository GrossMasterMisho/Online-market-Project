var express = require("express");
var router = express.Router();
var { public } = require("../config/config");
var userController = require("../controllers/userController");
var Product = require("../models/product");

router.use("/register", require("./registerRouter.js"));
router.use("/login", require("./loginRouter.js"));
router.use("/newProduct", require("./newProductRouter.js"));

router.get("/", function (req, res) {
  Product.find({}, function (err, products) {
    var productMap = {};

    products.forEach(function (product) {
      productMap[product._id] = product;
    });

    res.render(public + "/index.html", { items: products });
  });
});

router.get("/logout", function (req, res) {
  userController.logout(req, res);
});

router.get("/confirmation", (req, res, next) => {
  userController.confirmationPost(req, res, next);
});

router.get("/forgetPassword", (req, res, next) => {
  res.sendFile(public + "/authentication/emailVerification.html");
});

router.get("/passwordRecovery", (req, res, next) => {
  res.sendFile(public + "/authentication/passwordRecovery.html");
});

router.post("/passwordRecovery", (req, res, next) => {
  userController.passwordRecovery(req, res, next);
});

router.post("/password", (req, res, next) => {
  userController.changePassword(req, res, next);
});

router.get("/something", (req, res, next) => {
  Product.find({}, function (err, products) {
    var productMap = [];

    products.forEach(function (product) {
      productMap.push({
        ...product,
        img: {
          contentType: product.img.contentType,
          data: product.img.data.toString("base64"),
        },
      });
    });

    res.json(productMap);
  });
});

module.exports = router;
