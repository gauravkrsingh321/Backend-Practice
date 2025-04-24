//import the model
const Todo = require("../models/Todo");

//define route handler
exports.deleteTodo = async (req, res) => {
  try {
    //update todo item by id
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete({ _id : id });
    res.status(200).json({
      success: true,
      data: todo,
      message: "Deleted Successfully",
    });
  } 
  catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: err.message,
    });
  }
};
