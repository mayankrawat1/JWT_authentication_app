const User = require("../database/models/userModel");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

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
    res.status(200).send(user);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
  res.send("signup");
};

module.exports.login_post = (req, res) => {
  res.send("login");
};
