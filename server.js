require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./router/authRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set("view engine", "ejs");

//datbasse connection
require("./database/connection");

app.get("/", (req, res) => res.render("home"));
app.get("/icecreams", (req, res) => res.render("icecream"));

//Register routers
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
