//import the model
const Todo = require("../models/Todo");

//define route handler
exports.updateTodo = async (req, res) => {
  try {
    //update todo item by id
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      { _id : id },
      { title, description, updatedAt: Date.now() }
    );
    res.status(200).json({
      success: true,
      data: todo,
      message: "Updated Successfully",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: err.message,
    });
  }
};
