const jwt = require("jsonwebtoken");

module.exports = {
  authentication: (token) => {
    try {
      if (token) {
        return jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET,
          (err, decode) => {
            if (err) {
              return [error, "fail to verify token"];
            }
            return [decode];
          }
        );
      }
      return ["fail to verify token"];
    } catch (error) {
      return [error];
    }
  },
};
