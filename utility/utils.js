const bcrypt = require("bcrypt");

module.exports.hash = (password, callback) => {
  bcrypt.genSalt((error, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      callback(err, hash);
    });
  });
};

module.exports.checkHashPassword = (password, hash, next) => {
  bcrypt.compare(password, hash, (err, res) => {
    next(err, res);
  });
};
