var express = require("express");
var router = express.Router();
var { public } = require("../config/config");
var upload = require("../helpers/imageUpload");
var productController = require("../controllers/productController");

router.all("*", function (req, res, next) {
  if (req.path === "/fetchProducts" || req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
});

router.get("/newProduct", function (req, res) {
  res.sendFile(public + "/newProduct.html");
});

router.post("/newProduct", upload.single("image"), function (req, res) {
  productController.uploadNewProduct(req, res, req.user);
});

router.get("/fetchProducts", (req, res) => {
  productController.fetchAllProducts(req, res);
});

router.post("/addToCart", async (req, res) => {
  productController.addToCart(req, res);
});

module.exports = router;
