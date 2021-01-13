var express = require("express");
var app = express();
app.use("/static", express.static("public"));

var port = process.env.PORT || "3000";
app.set("port", port);

var router = require("./server/controllers/index");
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
