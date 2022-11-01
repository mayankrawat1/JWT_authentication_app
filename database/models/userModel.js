const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
    lowercase: [true, "All characters must be in lowercase"],
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minLength: [6, "Minimum length of password must be 6 characters long"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
