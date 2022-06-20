const Router = require("express").Router();
const addTodo = require("./controllers/addTodo");
const todoList = require("./controllers/todolist");
const completetodo = require("./controllers/completetodo");
const deletetodo = require("./controllers/deletetodo");

Router.post("/add/todo", addTodo);
Router.get("/todo", todoList);
Router.put("/complete/todo/:id", completetodo);
Router.delete("/delete/todo/:id", deletetodo);

Router.get("/", (req, res) => {
  console.log(req.body);
  res.send("Welcome to Node.js world my First Api!");
});

module.exports = Router;