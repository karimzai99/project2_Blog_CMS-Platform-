const { Blog, User, Post } = require("../models/schema.js");
const mongoose = require("mongoose");

const app = require("../app.js");

app.get("/blog/:blog_id", async (req, res) => {
  const blogId = new mongoose.Types.ObjectId(req.params.blog_id);
  const posts = await Post.find({ blogId }).populate("createdBy");
  const blog = await Blog.findById(req.params.blog_id).populate("createdBy");
  let isBlogOwner = false;
  if (
    req.session.loggedInUser &&
    blog.createdBy._id == req.session.loggedInUser._id
  ) {
    isBlogOwner = true;
  }
  res.render("blogs/blog", { posts, isBlogOwner, blogID: blog._id });
});
