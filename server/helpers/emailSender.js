const nodemailer = require("nodemailer");
const { public, host } = require("../config/config");

const sendEmail = (user, token, link, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yomarbazi.ge@gmail.com",
      pass: "ujejewfyitrwawwr",
    },
  });
  var mailOptions = {
    from: "Online market",
    to: user.email,
    subject: "Account Verification Token",
    text:
      "Hello, " +
      user.username +
      "\n\n" +
      "Please verify your account by clicking the link: \nhttp://" +
      host +
      link +
      "?token=" +
      token.token +
      "&email=" +
      user.email +
      ".\n",
  };
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      return res.render(public + "/authentication/infoMessage.html", {
        msg: err.message,
      });
    }
    return res.render(public + "/authentication/infoMessage.html", {
      msg: "Verification email has been sent to " + user.email,
    });
  });
};

module.exports.sendEmail = sendEmail;
