const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { registerController, loginController } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
/*
>>POST - user  register
>>POST - user login
>>GET - user details
>>GET - logout
*///hello
router.post("/register",registerController)

router.post("/login",loginController)



module.exports=router;