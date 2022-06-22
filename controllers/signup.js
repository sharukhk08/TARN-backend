const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupSchema = require("../schema/signup");

module.exports = async (req, res) => {
  const { firstname, lastname, email, mobile, city, password } = req.body;

  // check if firstname lastname email and password are not empty
  if (
    firstname === "" ||
    lastname === "" ||
    mobile === "" ||
    email === "" ||
    password === "" ||
    city === ""
  ) {
    return res.status(400).json({
      status: "error",
      message: "Please fill all the fields",
    });
  }

  const signupDetails = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    mobile: mobile,
    city: city,
    password: password,
  };
  const signup = new signupSchema(signupDetails);

  console.log(signup, "signup");
  // check if already exists user in database

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
  console.log(token);

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
              // send token with user data
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
