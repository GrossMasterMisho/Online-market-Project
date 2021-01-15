var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var { public } = require("../config/config");

router.get("/", function (req, res) {
  res.sendFile(public + "/authentication/registration.html");
});

router.post("/", function (req, res) {
  userController.addUser(req, res);
});

module.exports = router;
