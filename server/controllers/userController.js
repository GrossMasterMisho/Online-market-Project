const User = require("../models/user");

module.exports = {
  addUser: async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).send("That email already exisits!");
    }

    user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.status(400).send("That username already exisits!");
    }

    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
  },
};
