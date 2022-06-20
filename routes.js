const Router = require("express").Router();
const addTodo = require("./models/addTodo");
const todoList = require("./models/todolist");
const completetodo = require("./models/completetodo");
const deletetodo = require("./models/deletetodo");

Router.post("/add/todo", addTodo);
Router.get("/todo", todoList);
Router.put("/complete/todo/:id", completetodo);
Router.delete("/delete/todo/:id", deletetodo);

Router.get("/", (req, res) => {
  console.log(req.body);
  res.send("Welcome to Node.js world my First Api!");
});

module.exports = Router;
