const crypto = require("crypto");
const { sendEmail } = require("../helpers/emailSender");
const Token = require("../models/tokenVerificationModel");

module.exports = {
  saveTokenAndSendEmail: (user, link, res) => {
    var token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    token.save(function (err) {
      if (err) {
        return res.render(public + "/authentication/registration.html", {
          errorMessage: err.message,
        });
      }

      sendEmail(user, token, link, res);
    });
  },
};
