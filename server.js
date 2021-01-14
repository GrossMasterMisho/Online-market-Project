var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3001",
};

var passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

var User = require("./server/models/user");
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cookieParser());
app.use(cors(corsOptions));

app.engine("html", require("ejs").renderFile);

app.use("/static", express.static("public"));

var port = process.env.PORT || "3000";
app.set("port", port);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/misho", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection
  .once("open", function () {
    console.log("Database connected Successfully");
  })
  .on("error", function (err) {
    console.log("Error", err);
  });

const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(User.authenticate()));

var router = require("./server/routes/index");
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
