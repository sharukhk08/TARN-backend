const addTodoSchema = require("../schema/addTodo");

const gettodolist = async (req, res) => {
  try {
    const todolist = await addTodoSchema.find({});
    console.log(todolist);
    return res.status(200).json({
      status: "success",
      todos: todolist.reverse(),
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

module.exports = [gettodolist];