//import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//buisness logic
exports.createComment = async (req,res) => {
  try {
    //fetch data from request body
    const { post, user, body } = req.body;
    //create a new comment object 
    const comment = new Comment({
      post,user,body
    });
    //save/insert the new comment into database
    const savedComment = await comment.save();

    //find the post by ID, add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id} }, {new: true}) //{new: true} this returns updated document and if not specified it will return old document by default   
    .populate("comments")  //populate the comments array with comment documents otherwise only ids will come and not actual comments
    .exec()

    //send a json response with a success flag
    res.status(200).json({
      post: updatedPost
    });
  } 
  catch(error) {
    return res.status(500).json({
      error: "Error while creating comment"
    });
  }
};
