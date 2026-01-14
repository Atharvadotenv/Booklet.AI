const express = require("express");
const {userDataController} = require("../controllers/userData.controller");
const authMiddleware = require("../middlewares/auth.middleware"); 
const router=express.Router(); 

router.get("/",authMiddleware,userDataController);


module.exports = router;