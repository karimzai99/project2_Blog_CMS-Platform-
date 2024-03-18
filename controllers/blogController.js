const express = require("express");
const { Blog, User } = require("../models/schema.js");

// Router allows us to handle routing outisde of server.js
const router = express.Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.find().populate("createdBy");
  res.render("blogs", { blogs });
  //   res.send("hello");
});

module.exports = router;
