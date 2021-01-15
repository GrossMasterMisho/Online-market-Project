const tokenService = require("./tokenService");
const passport = require("passport");
const User = require("../models/user");
const Token = require("../models/tokenVerificationModel");
const { public } = require("../config/config");

module.exports = {
  findUserByEmail: (email) => {
    return User.findOne({ email: email });
  },

  findUserByUsername: (username) => {
    return User.findOne({ username: username });
  },

  registerUser: async (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
    });

    await User.register(user, req.body.password, function (err, user) {
      if (err) {
        return res.render(public + "/authentication/registration.html", {
          errorMessage: err.message,
        });
      } else {
        tokenService.saveTokenAndSendEmail(user, "/confirmation/", res);
      }
    });
  },

  loginUser: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.redirect("/login?info=" + info.message);
      }

      if (!user.isVerified) {
        const message = "Your account has not been verified.";
        return res.redirect("/login?info=" + message);
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

  passwordRecovery: (req, res, next) => {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user)
        return res.render(public + "/authentication/infoMessage.html", {
          msg: "We were unable to find user with this email",
        });

      tokenService.saveTokenAndSendEmail(user, "/passwordRecovery/", res);
    });
  },

  confirmPost: (req, res, next) => {
    Token.findOne({ token: req.query.token }, function (err, token) {
      // If we found a token, find a matching user
      User.findOne(
        { _id: token._userId, email: req.query.email },
        function (err, user) {
          if (!user)
            return res.render(public + "/authentication/infoMessage.html", {
              msg: "We were unable to find user with this token",
            });
          if (user.isVerified)
            return res.render(public + "/authentication/infoMessage.html", {
              msg: "User has already been verified",
            });

          // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
            if (err) {
              return res.status(500).send({ msg: err.message });
            }
            return res.render(public + "/authentication/infoMessage.html", {
              msg: "Email has been verified",
            });
          });
        }
      );
    });
  },

  changePassword: (req, res, next) => {
    Token.findOne({ token: req.body.token }, function (err, token) {
      // If we found a token, find a matching user
      User.findOne(
        { _id: token._userId, email: req.body.email },
        function (err, user) {
          if (!user)
            return res.render(public + "/authentication/infoMessage.html", {
              msg: "We were unable to find user with this email",
            });
          // Verify and save the user
          user.isVerified = true;
          user.setPassword(req.body.password, function (err) {
            if (err) {
              return res.render(public + "/authentication/infoMessage.html", {
                msg: err.message,
              });
            }
            user.save(function (err) {
              if (err) {
                return res.render(public + "/authentication/infoMessage.html", {
                  msg: "Something went wrong",
                });
              }
              return res.render(public + "/authentication/infoMessage.html", {
                msg: "Password has been changed",
              });
            });
          });
        }
      );
    });
  },
};
