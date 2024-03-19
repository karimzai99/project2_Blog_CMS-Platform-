const { Blog, User, Post } = require("../models/schema.js");
const mongoose = require("mongoose");

// const app = express(); is moved to a separate file so it can be imported in different controllers.
const app = require("../app.js");

app.get("/blog/:blog_id", async (req, res) => {
  // mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')
  const blogId = new mongoose.Types.ObjectId(req.params.blog_id);
  const posts = await Post.find({ blogId }).populate("createdBy");
  res.render("blogs/blog", { posts });
});
