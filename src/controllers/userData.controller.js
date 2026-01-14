const postModel = require("../models/post.model")

async function userDataController(req,res){
    try{
        const userId = req.user._id;

    const posts = await postModel
      .find({ userId })
      .select("contentType aiContent createdAt") // summary only
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "User posts fetched successfully",
      totalPosts: posts.length,
      posts
    });

    }catch(err)
    {
    console.error("Get user posts error:", err);
    return res.status(500).json({ message: "Server error" });

    }
}


module.exports = {userDataController};