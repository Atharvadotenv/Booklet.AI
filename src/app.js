const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({
  origin: "https://frontend-for-arti-clip-ai.vercel.app/",
  credentials: true,
}));

const authRoutes = require("../src/routes/auth.routes");
const postRoutes = require("../src/routes/post.routes");
const postDataRoutes = require("../src/routes/postData.routes");
// const scrapperRoutes = require("../src/routes/scrapper.routes");
const cookieParser = require("cookie-parser");

app.use(express.json()); // middleware
app.use(cookieParser());// cookie middleware


app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/data", postDataRoutes);
// app.use("/api/scrapping",scrapperRoutes);

module.exports = app;