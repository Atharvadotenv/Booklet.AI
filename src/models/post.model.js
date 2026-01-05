// models/post.model.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    contentType: {
      type: String,
      enum: ["text", "link"], // only allow text or link
      required: true
    },
    originalContent: {
      type: String,
      required: true
    },
    aiContent: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
