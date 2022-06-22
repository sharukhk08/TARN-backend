const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupSchema = require("../schema/signup");

module.exports = async (req, res) => {
  const { name, email, password } = req.body;

  // check if firstname lastname email and password are not empty
  if (name === "" || email === "" || password === "") {
    return res.status(400).json({
      status: "error",
      message: "Please fill all the fields",
    });
  }

  const signupDetails = {
    name: name,
    email: email,
    password: password,
  };
  const signup = new signupSchema(signupDetails);

  const passwordbcrypt = await bcrypt.hash("100", 8);
  const token = jwt.sign(
    {
      id: passwordbcrypt,
    },
    "secret",
    {
      expiresIn: 86400,
    }
  );
  signupSchema.findOne(
    {
      email: signupDetails.email,
    },
    (err, user) => {
      if (err) {
        res.status(500).json({
          message: "Internal server error",
        });
      } else if (user) {
        res.status(409).json({
          message: "User already exists, Please Login!",
        });
      } else {
        signup.save((err, user) => {
          if (err) {
            res.status(500).json({
              message: "Internal server error",
            });
          } else {
            res.status(201).json({
              token: token,
              user: user,
              message: "User created successfully",
            });
          }
        });
      }
    }
  );
};
