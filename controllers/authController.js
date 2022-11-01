const User = require("../database/models/userModel");

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
  res.send("signup");
};

module.exports.login_post = (req, res) => {
  res.send("login");
};
