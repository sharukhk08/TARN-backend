const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  console.log(req.headers);
  const token =
    req.headers["tarn-front-token"] ||
    req.body.token ||
    req.param.token ||
    req.headers.token;
  console.log(req.body, "in authentication");
  console.log(req.param, "in authentication");
  if (token) {
    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, decode) => {
      if (err) {
        console.log(err);
        res.status(404).json({
          success: false,
          message: "Failed to authenticate token",
        });
      } else {
        req.decoded = decode;
        next();
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No Token found",
    });
  }
};

module.exports = authentication;
