const jwt = require("jsonwebtoken");
const signupSchema = require("../schema/signup");
const util = require("../utility/utils");
const mongoose = require("mongoose");

const checkValidation = (req, res, next) => {
  const { name, email, password } = req.body;

  // check if firstname lastname email and password are not empty
  if (name === "" || email === "" || password === "") {
    return res.status(400).json({
      status: "error",
      message: "Please fill all the fields",
    });
  }
  next();
};

const checkExistingUser = (req, res, next) => {
  signupSchema.find(
    {
      email: req.body.email.toLowerCase(),
    },
    (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          isError: true,
          error: err,
        });
      }

      if (user.length > 0) {
        return res.status(401).json({
          success: false,
          message: "Email already exist. Choose another email",
        });
      }
      next();
    }
  );
};

const generateHashPassword = (req, res, next) => {
  util.hash(req.body.password, (err, hashPassword) => {
    if (err) {
      return res.status(500).json({
        success: false,
        isError: true,
        error: err,
      });
    }
    req.data = {};
    req.data.hashPassword = hashPassword;

    next();
  });
};

const createUser = (req, res, next) => {
  const payload = {
    email: req.body.email,
    name: req.body.name,
    password: req.data.hashPassword,
  };

  signupSchema.create(payload, (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        isError: true,
        error: err,
      });
    }
    req.data.createdUser = JSON.parse(JSON.stringify(user));
    next();
  });
};
const generateToken = (req, res) => {
  const payload = {
    email: req.data.createdUser.email,
    _id: req.data.createdUser._id,
  };

  const token = jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "1d",
  });

  res.status(200).json({
    success: true,
    message: "You are registered successfully",
    token,
    user: req.data.createdUser,
  });
};

module.exports = [
  checkValidation,
  checkExistingUser,
  generateHashPassword,
  createUser,
  generateToken,
];
