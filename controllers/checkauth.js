const jwt = require("jsonwebtoken");
const signupSchema = require("../schema/signup");
const addTodoSchema = require("../schema/addTodo");

// check if token is valid then send user details
const checkauth = (req, res, next) => {
  console.log(req.decoded);
  const token =
    req.headers["tarn-front-token"] || req.body.token || req.param.token;
  console.log(token, "token in checkauth");
  // const authHeader = req.headers["authorization"];
  // console.log(req.headers);
  // console.log(authHeader, "authHeader");
  // const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  const getUserDetailsByEmail = (email) => {
    return new Promise((resolve, reject) => {
      signupSchema.findOne({ email: email }, (err, user) => {
        if (err) reject(err);
        resolve(user);
      });
    });
  };

  const getTodoListNumberByEmail = (email) => {
    return new Promise((resolve, reject) => {
      addTodoSchema.find({ email: email }, (err, todoList) => {
        if (err) reject(err);
        resolve(todoList);
      });
    });
  };

  jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, user, next) => {
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
