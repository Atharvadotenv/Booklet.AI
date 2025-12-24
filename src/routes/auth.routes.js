const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");
/*
>>POST - user  register
>>POST - user login
>>GET - user details
>>GET - logout
*/
router.post("/register",async (req,res)=>{
    const {username,password}=  req.body

     const  user = await userModel.create({
        username,password
     })
     const token = jwt.sign({id: user._id,},process.env.JWT_SECRET)
      res.cookie("token",token);

     res.status(201).json({
        message:"User registered Sucessfully"
        ,user
     })

})

router.post("/login",async (req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({
       username: username
    });
    
    if(!user)
    {
        return res.status(401).json({
            message:"USERNAME NOT EXISTS"
        })
    }
    const isPasswordValid = password == user.password
  
   if(!isPasswordValid)
   {
         return res.status(401).json({
        message:" Password Incorrect"
      })
   }
   else{
         return  res.status(200).json({
        message:" YOU LOGGEDIN SUCESSFULLY "
      })
   }
 
})

router.get("/user", async (req,res)=>{
    const {token} = req.cookies;
    if(!token)
    {
        return res.status(401).json({
            message:" User UNAUTHORIZED "
        })
    }
    try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await userModel.findOne({
        _id:decoded.id
    }).select("-password -__v").lean()
    
    res.status(200).json({
        message:"User Data fetched sucessfully",
        user
    })

    }catch(err){
    return res.status(401).json({
            message:"user unauthorized invalid token"
        })
    }
    
})

module.exports=router;