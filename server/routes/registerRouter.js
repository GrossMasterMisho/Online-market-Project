var express = require("express");
var router = express.Router();
var path = require("path");
var userController = require("../controllers/userController");

const public = path.join(__dirname, "/../../public/views");

router.get("/", function (req, res) {
  res.sendFile(public + "/registration.html");
});

router.post("/", function (req, res) {
  userController.addUser(req, res);
});

module.exports = router;
