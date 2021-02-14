var express = require("express");
var router = express.Router();
var { public } = require("../config/config");
var userController = require("../controllers/userController");
var productController = require("../controllers/productController");

router.use("/register", require("./registerRouter"));
router.use("/login", require("./loginRouter"));
router.use("/product", require("./productRouter"));
router.use("/cart", require("./cartRouter"));
router.use("/orders", require("./orderRouter"));

// router.all("*", function (req, res, next) {
//   if (req.path === "/" || req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// });

router.get("/", function (req, res) {
  res.sendFile(public + "/index.html");
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

router.get("/search-results", (req, res, next) => {
  productController.searchProduct(req, res, next);
});

router.get("/search", (req, res) => {
  res.sendFile(public + "/search-results.html");
});

module.exports = router;
