const { Blog, User, Post } = require("../models/schema.js");
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
// const app = express(); is moved to a separate file so it can be imported in different controllers.
const app = require("../app.js");
require("dotenv").config();

app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Parse URL-encoded bodies

app.use(
  session({
    secret: process.env.SESSIONKEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 8 * 60 * 60 * 1000 },
  })
);

app.use(function (req, res, next) {
  res.locals.loggedInUser = req.session.loggedInUser;
  next();
});

app.post("/login", async (req, res) => {
  // mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')
  if (!req.body.email || !req.body.password) {
    res.render("login", { wrongData: true });
  } else {
    const user1 = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user1) {
      req.session.loggedInUser = user1; // Set session identifier
      req.session.save(function (err) {
        if (err) return next(err);
        res.redirect("/blogs");
      });
      //   res.redirect("/blogs");
    } else {
      res.render("login", { wrongData: true });
    }
  }
  //   const blogId = new mongoose.Types.ObjectId(req.params.blog_id);
  //   const posts = await Post.find({ blogId }).populate("createdBy");
  //   res.render("blogs/blog", { posts });
});

// login

app.get("/login", (req, res) => {
  res.render("login");
  // res.send('hello')
});

// sign up

app.get("/signup", (req, res) => {
  res.render("signup");
  // res.send('hello')
});

app.get("/logout", (req, res) => {
  req.session.loggedInUser = null;
  res.redirect("/");
  // res.send('hello')
});
