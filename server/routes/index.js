var express = require("express");
var router = express.Router();
var { public } = require("../config/config");
var userController = require("../controllers/userController");

router.use("/register", require("./registerRouter.js"));
router.use("/login", require("./loginRouter.js"));
router.use("/newProduct", require("./newProductRouter.js"));

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

module.exports = router;
