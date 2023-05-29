const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a user name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    min: [6, "passowrd must be greater or equal 6"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please retype your password"],
    min: [6, "confirmPassowrd must be greater or equal 6"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "confirm password did not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async function (
  candidPassowrd,
  hashedPassword
) {
  return await bcrypt.compare(candidPassowrd, hashedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
