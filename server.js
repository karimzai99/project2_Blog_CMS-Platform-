const express = require("express");
const mongoose = require("mongoose");
const mehodOverride = require("method-override");

// const passport = require("passport");

// Server
const PORT = process.env.PORT || 3000;

require("dotenv").config();

// const app = express();
const app = require("./app.js");

app.set("view engine", "ejs");

// app.use('/blogs', blogsController)
// MongoDB Connection

const DBURI = process.env.MONGODBURI;

mongoose.connect(DBURI);

const db = mongoose.connection;

module.exports = { db: db };

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

// Middleware

app.use(express.static("public"));
app.use(mehodOverride("_method"));

// Routes

const authController = require("./controllers/authController.js");
const blogsListController = require("./controllers/blogsListController.js");
const postsListController = require("./controllers/postsListController.js");
const postController = require("./controllers/postController.js");

app.get("/", (req, res) => {
  res.render("index");
  // res.send('hello')
});

// // new post

// app.get("/new", (req, res) => {
//   res.render("blogs/post");
//   // res.send('hello')
// });

//

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
