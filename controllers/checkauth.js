const jwt = require("jsonwebtoken");
const signupSchema = require("../schema/signup");
const addTodoSchema = require("../schema/addTodo");

// check if token is valid then send user details
const checkauth = (req, res, next) => {
  const token =
    req.headers["tarn-front-token"] || req.body.token || req.param.token;
  if (token == null) return res.sendStatus(401);

  const getUserDetailsByEmail = (email) => {
    return new Promise((resolve, reject) => {
      signupSchema.findOne({ email: email }, (err, user) => {
        if (err) reject(err);
        resolve(user);
      });
    });
  };

  const getTodoListNumberByEmail = (userId) => {
    console.log(userId, "userId");
    return new Promise((resolve, reject) => {
      addTodoSchema.find({ userId: userId }, (err, todoList) => {
        if (err) reject(err);
        resolve(todoList);
      });
    });
  };

  jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, user, next) => {
    if (err) return res.sendStatus(403);
    getTodoListNumberByEmail(user._id).then((todoList) => {
      user.todolist = todoList.length;
    });

    getUserDetailsByEmail(user.email).then((user) => {
      res.status(200).json({
        message: "user authenticated",
        user: user,
        success: true,
      });
    });
  });
};

module.exports = checkauth;
