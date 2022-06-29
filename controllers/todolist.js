const addTodoSchema = require("../schema/addTodo");

const gettodolist = async (req, res) => {
  try {
    const todolist = await addTodoSchema.find({});
    // get user id from token and compare with todolist user id  and send only todolist of that user'
    const userId = req.decoded._id;
    if (todolist.length > 0) {
      const todolistOfUser = todolist.filter(
        (todo) => todo.userId && todo.userId.toString() === userId.toString()
      );
      return res.status(200).json({
        status: "success",
        todos: todolistOfUser.reverse(),
      });
    } else {
      return res.status(200).json({
        status: "success",
        todos: todolist,
      });
    }
  } catch (err) {
    console.log(err, "err");
    return res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

module.exports = [gettodolist];
