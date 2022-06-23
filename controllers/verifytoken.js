const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = {
  authentication: (token) => {
    try {
      if (token) {
        return jwt.verify(token, config.secert, (err, decode) => {
          if (err) {
            return [error, "fail to verify token"];
          }
          return [decode];
        });
      }
      return ["fail to verify token"];
    } catch (error) {
      return [error];
    }
  },
};
