var express = require("express");
var router = express.Router();
var { public } = require("../config/config");
var userController = require("../controllers/userController");

router.use("/register", require("./registerRouter.js"));

router.get("/", function (req, res) {
  res.sendFile(public + "/index.html");
});

router.get("/logout", function (req, res) {
  userController.logout(req, res);
});

router.get("/login", function (req, res) {
  res.sendFile(public + "/index.html");
});

router.post("/login", (req, res, next) => {
  userController.login(req, res, next);
});

module.exports = router;
