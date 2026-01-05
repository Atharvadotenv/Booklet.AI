const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               // allow cookies later
}));
const authRoutes = require("../src/routes/auth.routes");
const postRoutes = require("../src/routes/post.routes");
// const scrapperRoutes = require("../src/routes/scrapper.routes");
const cookieParser = require("cookie-parser");

app.use(express.json()); // middleware
app.use(cookieParser());// cookie middleware


app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
// app.use("/api/scrapping",scrapperRoutes);

module.exports = app;