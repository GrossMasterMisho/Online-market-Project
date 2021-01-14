var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var { public } = require("../config/config");

router.get("/", function (req, res) {
  res.sendFile(public + "/registration.html");
});

router.post("/", function (req, res) {
  const result = userController.addUser(req);
  result
    .then((result) => {
      if (result === true) {
        res.redirect("/");
      } else {
        res.render(public + "/registration.html", { errorMessage: result });
      }
      return result;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
