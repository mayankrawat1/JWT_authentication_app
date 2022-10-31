require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

require("./database/connection");

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
