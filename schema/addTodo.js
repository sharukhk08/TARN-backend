const mongoose = require("mongoose");

const addTodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("addTodo", addTodoSchema);
