const addTodoSchema = require("../schema/addTodo");

const mongoose = require("mongoose");

module.exports = (req, res) => {
  const { title, completed, userId, created_at, updated_at } = req.body;
  const todoObj = {
    title: title,
    completed: completed,
    created_at: created_at,
    updatedAt: updated_at,
    userId: userId,
    _id: new mongoose.Types.ObjectId(),
  };
  const todoModel = new addTodoSchema(todoObj);
  todoModel
    .save()
    .then((todo) => {
      return res.status(200).json({
        status: "success",
        data: todoObj,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
