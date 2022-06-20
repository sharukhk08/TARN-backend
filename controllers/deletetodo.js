const addTodoSchema = require("../schema/addTodo");

const deletetodo = async (req, res) => {
  console.log(req.params.id);
  try {
    const todolist = await addTodoSchema.find({});
    await Promise.all(
      todolist.map(async (todo) => {
        if (todo._id == req.params.id) {
          await todo.remove();
        }
      })
    );
    return res.status(200).json({
      status: "Todo deleted successfully",
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err,
    });
  }
};
module.exports = [deletetodo];
