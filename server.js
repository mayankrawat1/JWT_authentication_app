require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.static("public"));

//view engine
app.set("view engine", "ejs");

//datbasse connection
require("./database/connection");

app.get("/", (req, res) => res.render("home"));
app.get("/icecreams", (req, res) => res.render("icecream"));

app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
