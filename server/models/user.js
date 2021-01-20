const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  cart: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  isVerified: { type: Boolean, default: false },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userschema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userschema);
