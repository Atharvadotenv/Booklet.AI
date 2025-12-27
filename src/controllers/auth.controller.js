const userModel = require("../models/user.model");
const jwt= require("jsonwebtoken");
const bcrypt = require("bcrypt");


async function registerController(req,res){
          const {username,password}=  req.body
           
              try{
                  const userExists = await  userModel.findOne({
                      username
                  })
                  if(userExists)
                  {
                     return  res.status(409).json({
                          message:"User Already Exists"
                      })
                  }
                  const hashedPassword = await bcrypt.hash(password,10);
          
               const  user = await userModel.create({
                  username,
                  password:hashedPassword
               })
          
               res.status(201).json({
                  message:"User registered Sucessfully"
                  ,user
               })
          
          } catch (err)
          {
              if(err.code==11000)
              {
                  return res.status(409).json({
                      message:"username already exists try another one"
                  })
              }
              res.status(500).json({
                  message:"Server Error",
                  error:err.message
              })
          
          }
    } 

async function loginController(req,res){

    try{

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
    const isPasswordValid = await bcrypt.compare(password,user.password);
  
   if(!isPasswordValid)
   {
         return res.status(401).json({
        message:" Password Incorrect"
      })
   }
    const token = jwt.sign({id: user._id,},process.env.JWT_SECRET)
      res.cookie("token",token,{
      httpOnly: true,    
       secure: false,       
    sameSite: "lax"
      });

        return res.status(200).json({
        message:" YOU LOGGEDIN SUCESSFULLY "
       })
    }catch(err)
    {
        return res.status(500).json({
            message:" Server Error"
        });

    }

}
    




    module.exports={
        registerController,
        loginController }
