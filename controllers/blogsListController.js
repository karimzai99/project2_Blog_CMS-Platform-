const { Blog, User } = require("../models/schema.js");

// const app = express(); is moved to a separate file so it can be imported in different controllers.
const app = require("../app.js");

app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().populate("createdBy");
  res.render("blogs/blogsList", { blogs });
});

app.get("/new-blog", async (req, res) => {
  // const blogs = await Blog.find().populate("createdBy");
  res.render("blogs/newBlog");
});

app.post("/new-blog", async (req, res) => {
  // mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')
  if (!req.body.title) {
    res.render("blogs/newBlog", { wrongData: true });
  } else {
    const blog1 = await Blog.create({
      title: req.body.title,
      createdBy: req.session.loggedInUser, // session current user is logged in
    });
    res.redirect("/blog/" + blog1.id);
  }
});
