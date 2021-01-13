var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use("/static", express.static("public"));

var port = process.env.PORT || "3000";
app.set("port", port);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/misho", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", function () {
    console.log("Database connected Successfully");
  })
  .on("error", function (err) {
    console.log("Error", err);
  });

var router = require("./server/routes/index");
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
