var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var { public } = require("../config/config");

router.get("/", function (req, res) {
  res.sendFile(public + "/index.html");
});

router.post("/", function (req, res, next) {
  userController.login(req, res, next);
});

module.exports = router;
