var express = require("express");
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");

router.use("/register", require("./registerRouter.js"));

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/../../public/views/index.html"));
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname + "../../../public/views/index.html"));
});

module.exports = router;
