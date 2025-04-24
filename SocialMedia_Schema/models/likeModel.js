const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  post:{
    type: mongoose.Schema.Types.ObjectId, //Referencing to an another object by id
    ref:"Post" //Reference to the post model
  },
  user:{
    type:String,
    required:true
  },
})

module.exports = mongoose.model("Like",likeSchema);