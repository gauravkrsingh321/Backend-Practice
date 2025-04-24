//import model
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//like a post
exports.likePost = async (req, res) => {
  try {
    //fetch data from request body
    const {post,user} = req.body;
    //create a new like object
    const like = new Like({
      post,
      user,
    });
    //save/insert the new like into database
    const savedLike = await like.save();

    //find the post by ID, add the new like to its likes array
    const likedPost = await Post.findByIdAndUpdate( post, { $push: { likes: savedLike._id } },{ new: true }) //{new: true} this returns updated document and if not specified it will return old document by default
      .populate("likes") //populate the likes array with likes documents otherwise only ids will come and not actual likes
      .populate("comments")
      .exec();

    //send a json response 
    res.status(200).json({
      post: likedPost
    });
  } 
  catch (error) {
    return res.status(404).json({
      error:"Error in liking the post"
    })
  }
};

//unlike a post
exports.unlikePost = async (req, res) => {
  try {
    //fetch data from request body
    const {post,like} = req.body;
   
    //find and delete from like collection
    const deletedLike = await Like.findOneAndDelete({post:post, _id:like});//Finds first document whose post id and like id,it matches and deletes it //This is a query object in MongoDB. It means:"Find a document where both post and _id fields match the values we provided."✅ findByIdAndDelete() is valid and works with just _id. ⚠️ findOneAndDelete({ _id, post }) is safer — it avoids accidental deletes if the wrong ID is passed.

    //update the post collection
    const unlikedPost = await Post.findByIdAndUpdate( post, { $pull: { likes: deletedLike._id } },{ new: true }) //This is a MongoDB update operator: $pull removes a specific value from an array field.Here, it means: Remove the value deletedLike._id from the likes array in the Post document.
    
    //send a json response 
    res.status(200).json({
      post: unlikedPost,
      message:"Unliked this specific post successfully"
    });
  } 
  catch (error) {
    return res.status(404).json({
      error:"Error in unliking the post"
    })
  }
};


exports.dummyLink = (req, res) => {
  res.send("This is your Dummy page");
};
