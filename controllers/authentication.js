const jwt = require("jsonwebtoken");
const config = require("config");

const authentication = (req, res, next) => {
  const token =
    req.headers["x-access-token"] || req.body.token || req.param.token;
  if (token) {
    jwt.verify(token, config.secert, (err, decode) => {
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
