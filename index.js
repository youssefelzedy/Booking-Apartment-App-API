const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.json("Hello World");
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  res.json({ username, email, password });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
