const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const userObject = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };
    const user = await User.create(userObject);
    const token = signToken(user._id);
    user.password = undefined;
    res.status(201).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
      err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next("Please provide email and password");
    const user = await User.findOne({ email });
    // console.log(user);

    if (!user || !(await user.comparePassword(password, user.password))) {
      return next("password did not match");
    }
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
      err,
    });
  }
};
