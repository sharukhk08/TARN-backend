const Router = require("express").Router();
const addTodo = require("./controllers/addTodo");
const todoList = require("./controllers/todolist");
const completetodo = require("./controllers/completetodo");
const deletetodo = require("./controllers/deletetodo");
const login = require("./controllers/login");
const signup = require("./controllers/signup");
const checkauth = require("./controllers/checkauth");
const authentication = require("./controllers/authentication");
const addquizscore = require("./controllers/addquizscore");
const scorelist = require("./controllers/scorelist");

Router.post("/login", login);
Router.post("/signup", signup);
Router.use(authentication);
Router.post("/me", checkauth);
Router.post("/add/todo", addTodo);
Router.get("/todo", todoList);
Router.put("/complete/todo/:id", completetodo);
Router.delete("/delete/todo/:id", deletetodo);

Router.post("/add/quiz", addquizscore);
Router.get("/list/quiz", scorelist);

Router.get("/", (req, res) => {
  res.send("Welcome to Node.js world my First Api!");
});

module.exports = Router;
