//import the model
const Todo = require("../models/Todo");

//define route handler
exports.getTodos = async (req, res) => {
  try {
    //fetch all todo items from DB
    const response = await Todo.find({}); //empty {} means no condition so find all items i.e. {} is an empty filter object, meaning no filter — it grabs everything.
    //send a json response with a success flag
    res.status(200).json({
      success: true,
      data: response,
      message: "Entire Todo Data Fetched",
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

exports.getTodoById = async (req, res) => {
  try {
    //fetch todo items based on id
    const id = req.params.id;
    const todo = await Todo.findById({ _id: id });
    //data forgiven i.e. id not found
    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "No Data Found With Given Id",
      });
    }
    //data for given id Founded
    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo ${id} data successfully fetched`,
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
