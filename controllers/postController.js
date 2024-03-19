const { Blog, User, Post } = require("../models/schema.js");
const mongoose = require("mongoose");

// const app = express(); is moved to a separate file so it can be imported in different controllers.
const app = require("../app.js");

app.get("/post/:post_id", async (req, res) => {
  // mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')
  //   const blogId = new mongoose.Types.ObjectId(req.params.blog_id);
  const post = await Post.findById(req.params.post_id).populate("createdBy");
  res.render("blogs/post", { post });
});

app.get("/new-post/:blog_id", async (req, res) => {
  // const blogs = await Blog.find().populate("createdBy");
  res.render("blogs/newPost", { blog_id: req.params.blog_id });
});

app.post("/new-post", async (req, res) => {
  // mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')
  if (!req.body.title || !req.body.content) {
    res.render("blogs/newPost", { wrongData: true, blog_id: req.body.blog_id });
  } else {
    const post1 = await Post.create({
      title: req.body.title,
      body: req.body.content,
      blogId: req.body.blog_id,
      createdBy: req.session.loggedInUser,
    });
    res.redirect("/post/" + post1.id);
  }
});
