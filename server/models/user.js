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
  // password: {
  //   type: String,
  //   required: true,
  // },
});

userschema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userschema);
