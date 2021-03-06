const jwt = require("jsonwebtoken");
const signupSchema = require("../schema/signup");
const util = require("../utility/utils");
const mongoose = require("mongoose");

const logIn = (req, res, next) => {
  signupSchema.find({ email: req.body.email.toLowerCase() }, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, isError: true, error: err });
    }
    if (!user || user.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "invalid credentials" });
    }
    req.data = {};

    req.data.user = JSON.parse(JSON.stringify(user[0]));
    next();
  });
};

const comparePassword = (req, res, next) => {
  util.checkHashPassword(
    req.body.password,
    req.data.user.password,
    (err, isMatch) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, isError: true, error: err });
      }
      if (isMatch) {
        next();
      } else {
        return res.status(401).json({
          success: false,
          isError: true,
          message: "You have entered wrong email or password",
        });
      }
    }
  );
};

const generateToken = (req, res) => {
  const payload = {
    email: req.data.user.email,
    _id: req.data.user._id,
    id: req.data.user.id,
  };
  const token = jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "1d",
  });

  // delete req.data.user.password;

  res.status(200).json({
    success: true,
    message: "You are loged in successfully",
    token,
    user: req.data.user,
  });
};

module.exports = [logIn, comparePassword, generateToken];
