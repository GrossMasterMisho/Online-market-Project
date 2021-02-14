var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var { public } = require("../config/config");

router.all("*", function (req, res, next) {
  if (req.path === "/" || req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
});

router.get("/", function (req, res) {
  res.redirect("/");
});

router.post("/", function (req, res, next) {
  userController.login(req, res, next);
});

module.exports = router;
