const express = require("express");
const { scrapperController } = require("../controllers/scrapper.controller");
const router = express.Router();


router.post("/", scrapperController);



module.exports = router;