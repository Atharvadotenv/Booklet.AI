const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");

async function userPostController(req,res){
try{

    const {contentType,value} = req.body;
      if (!contentType || !value) {
      return res.status(400).json({
        message: "contentType and value are required"
      });
    }

  
    const post = await postModel.create({
      contentType,
      value,
      userId: req.user._id   
    });
     return res.status(201).json({
      message: "Post created successfully",
      post
    });

}catch(err)
{
     if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message
      });
    }

    return res.status(500).json({
      message: "Server error"
    });
  }
}






module.exports = {userPostController};