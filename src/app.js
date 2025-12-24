const express = require("express");
const app = express();
const authRoutes = require("../src/routes/auth.routes");
const cookieParser = require("cookie-parser");

app.use(express.json()); // middleware
app.use(cookieParser());// cookie middleware


app.use("/auth",authRoutes);

module.exports=app;