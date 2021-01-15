const userService = require("../services/userService");
const { public } = require("../config/config");

module.exports = {
  addUser: async (req, res) => {
    let user = await userService.findUserByEmail(req.body.email);

    if (user) {
      return res.render(public + "/authentication/registration.html", {
        errorMessage: "That email already exisits!",
      });
    }

    user = await userService.findUserByUsername(req.body.username);

    if (user) {
      return res.render(public + "/authentication/registration.html", {
        errorMessage: "That username already exisits!",
      });
    }

    userService.registerUser(req, res);
  },

  login: (req, res, next) => {
    userService.loginUser(req, res, next);
  },

  logout: (req, res) => {
    req.logout();
    res.clearCookie("username");
    res.redirect("/");
  },

  confirmationPost: (req, res, next) => {
    userService.confirmPost(req, res, next);
  },
  passwordRecovery: (req, res, next) => {
    userService.passwordRecovery(req, res, next);
  },

  changePassword: (req, res, next) => {
    userService.changePassword(req, res, next);
  },
};
