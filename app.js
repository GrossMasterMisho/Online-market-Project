const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const router = express.Router();
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

app.use("/", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
