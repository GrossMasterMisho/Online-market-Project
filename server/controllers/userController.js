const User = require("../models/user");
const passport = require("passport");

module.exports = {
  addUser: async (req) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return "That email already exisits!";
    }

    user = await User.findOne({ username: req.body.username });

    if (user) {
      return "That username already exisits!";
    }

    user = new User({
      username: req.body.username,
      email: req.body.email,
    });

    await User.register(user, req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        return "Something went wrong";
      } else {
        return true;
      }
    });

    return true;
  },

  login: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login?info=" + info.message);
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        res.cookie("username", req.user.username);
        return res.redirect("/?user=" + req.user.username);
      });
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logout();
    res.clearCookie("username");
    res.redirect("/");
  },
};
