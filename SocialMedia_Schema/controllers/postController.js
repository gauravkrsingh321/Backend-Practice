const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    //fetch data from request body
    const { title, body } = req.body;
    //create new post and insert it into db
    const createdPost = await Post.create({ title, body });
    //send a response
    res.status(200).json({
      post: createdPost,
      success: true,
      message: "Post Created Successfully",
    });
  } 
  catch (error) {
    return res.status(500).json({
      error: "Error while fetching posts",
    });
  }
};

exports.fetchAllPosts = async (req, res) => {
  try {
    //fetch post from db
    //Post.find({}) means: "Find all posts where the query matches an empty object", i.e., there are no filter conditions — so it returns all documents.Post.find() without any arguments is just shorthand for the same thing — it defaults to Post.find({}).
    //The two lines you've written both fetch documents from a MongoDB collection using Mongoose, but there's a key difference: the second one includes population of referenced documents, specifically the comments field.
    // ✅ 1. const fetchedPosts = await Post.find({})
    // What it does:
    // Fetches all documents in the Post collection.
    // What you get: Each post document as stored in MongoDB, including the comments field as an array of ObjectIds (references), not the actual comment content.

    // ✅ 2. const fetchedPosts = await Post.find({}).populate("comments").exec()
    // What it does: Same as above, but also populates the comments field with the actual comment documents from the related collection (assuming comments contains refs to another collection).
    // What you get: Each post document with comments as an array of full comment documents, instead of just ObjectIds.
    // Why .exec()?
    // .exec() returns a true Promise and gives you better stack traces for debugging. While Mongoose can await the query without .exec(), using it is a good practice.
    // const fetchedPosts = await Post.find({})
    const fetchedPosts = await Post.find({}).populate("comments").populate("likes").exec();
    //send a response
    res.status(200).json({
      post: fetchedPosts,
      success: true,
      message: "Fetched All Posts Successfully",
    });
  } 
  catch (error) {
    return res.status(400).json({
      error: "Error while fetching Posts",
    });
  }
};
