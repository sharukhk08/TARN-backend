const Router = require("express").Router();
const addTodo = require("./controllers/addTodo");
const todoList = require("./controllers/todolist");
const completetodo = require("./controllers/completetodo");
const deletetodo = require("./controllers/deletetodo");
const login = require("./controllers/login");
const signup = require("./controllers/signup");

Router.post("/login", login);
Router.post("/signup", signup);
Router.post("/add/todo", addTodo);
Router.get("/todo", todoList);
Router.put("/complete/todo/:id", completetodo);
Router.delete("/delete/todo/:id", deletetodo);

Router.get("/", (req, res) => {
  res.send("Welcome to Node.js world my First Api!");
});

module.exports = Router;
