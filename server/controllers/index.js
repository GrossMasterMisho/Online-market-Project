var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
router.use("/register", require("./registerController"));

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/../../public/views/index.html"));
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname + "../../../public/views/index.html"));
});

module.exports = router;
