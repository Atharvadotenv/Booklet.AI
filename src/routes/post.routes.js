const express = require("express");
const jwt = require("jsonwebtoken");
const { userPostController } = require("../controllers/post.controller");
const router = express.Router();
const userModel = require("../models/user.model");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/",authMiddleware,userPostController);



module.exports=router;