require("dotenv").config();
const User = require("../database/models/userModel");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  //Login email error
  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
  }

  //Login email error
  if (err.message === "Incorrect password") {
    errors.password = "Password not match";
  }

  //duplicate email error
  if (err.code === 11000) {
    errors.email = "That email is already exists";
    return errors;
  }

  //validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 60 * 60 * 24,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 1000 * 60 * 60 * 24,
    });
    res.status(200).send({ user: user._id });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
    return;
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 1000 * 60 * 60 * 24,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};
