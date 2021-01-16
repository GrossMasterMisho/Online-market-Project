var express = require("express");
var router = express.Router();
var { public } = require("../config/config");
var upload = require("../helpers/imageUpload");
var Product = require("../models/product");
var fs = require("fs");
var path = require("path");

router.get("/", function (req, res) {
  res.sendFile(public + "/newProduct.html");
});

router.post("/", upload.single("image"), function (req, res) {
  const user = req.user;
  var product = new Product({
    _userId: user._id,
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(__dirname, "/../uploads/", req.file.filename)
      ),
      contentType: "image/png",
    },
  });
  Product.create(product, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/");
    }
  });
});

module.exports = router;
