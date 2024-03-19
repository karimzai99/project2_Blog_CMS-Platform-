const { Blog, User } = require("../models/schema.js");

// const app = express(); is moved to a separate file so it can be imported in different controllers.
const app = require("../app.js");

app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().populate("createdBy");
  res.render("blogs", { blogs });
});
