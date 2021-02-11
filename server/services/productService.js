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
      if (err || !products) {
        console.log(err);
        return [];
      }
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
    var cart = [...user.cart];
    for (pr in cart) {
      const id = JSON.stringify(cart[pr]);
      // const product_id = JSON.stringify(product._id);
      if (id === '"' + productId + '"') {
        throw new Error("no such product");
      }
    }
    return await Product.findById(productId, async function (err, product) {
      if (err) {
        throw err;
      }
      if (!product) throw new Error("no such product");
      cart.push(productId);
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
