const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req,res,next){
     const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"This user not Exists please login first"
            })
        }
    
        try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findOne({
            _id: decoded.id
        }) 
          
         if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }
  

        req.user = user;
        next();
    
    }catch(err){
        console.log("error: - ",err.message);
        return res.status(401).json({
            message:"Invalid Token please login again"
        })
    
    }
}

module.exports = authMiddleware;    