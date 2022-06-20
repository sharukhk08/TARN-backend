const addTodoSchema = require("../schema/addTodo");
const mongoose = require("mongoose");

// Create a new story
const completetodo = async (req, res) => {
  console.log(req.params.id);
  try {
    const todolist = await addTodoSchema.find({});
    console.log(todolist, "todolist");
    await Promise.all(
      todolist.map(async (todo) => {
        if (todo._id == req.params.id) {
          todo.completed = !todo.completed;
          await todo.save();
        }
      })
    );

    return res.status(200).json({
      status: "success",
      todos: todolist,
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

module.exports = [completetodo];

// module.export = async (req, res) => {
