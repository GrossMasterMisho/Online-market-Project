const Product = require("../models/product");
const User = require("../models/user");
var fs = require("fs");
var path = require("path");

module.exports = {
  uploadNewProduct: async (req, user) => {
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

    return await Product.create(product);
  },

  fetchAllProducts: async () => {
    let result = [];
    await Product.find({}, function (err, products) {
      var productMap = [];

      products.forEach(function (product) {
        productMap.push({
          ...product.toObject(),
          img: {
            contentType: product.img.contentType,
            data: product.img.data.toString("base64"),
          },
        });
      });

      result = productMap;
    });
    return result;
  },

  addToCart: async (productId, user) => {
    return await Product.findById(productId, async function (err, product) {
      if (err) {
        throw err;
      }
      if (!product) throw "no such product";
      var cart = [...user.cart];
      cart.push(product._id);
      User.findById(user._id, function (err, user) {
        if (err) {
          throw err;
        }
        user.cart = cart;
        user.save();
      });
    });
  },
};
