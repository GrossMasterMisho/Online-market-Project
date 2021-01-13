var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.send("Wiki home page");
});

module.exports = router;
