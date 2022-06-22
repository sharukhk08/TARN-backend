const jwt = require("jsonwebtoken");
const signupSchema = require("../schema/signup");

// check if token is valid then send user details
const checkauth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(req.headers);
  console.log(authHeader, "authHeader");
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  console.log(token);
  const getUserDetailsByEmail = (email) => {
    return new Promise((resolve, reject) => {
      signupSchema.findOne({ email: email }, (err, user) => {
        if (err) reject(err);
        resolve(user);
      });

      //     const userExixts = await signupSchema.findOne({
      //   email: req.body.email,
      // });
    });
  };

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user, next) => {
    if (err) return res.sendStatus(403);
    getUserDetailsByEmail(user.email).then((user) => {
      res.status(200).json({
        message: "user authenticated",
        user: user,
        success: true,
      });
    });
  });

  // send user data back to client
  // const user = await getUserDetailsByEmail(req.body.email);
  // req.user = user;
  // next();
};

module.exports = checkauth;
