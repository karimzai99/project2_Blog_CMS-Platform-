// data from the schema
const { Blog, User, Post } = require("../models/schema.js");

const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
// brother helped me
// to avoid cyclic dependency const app = express(); has been move to app.js file so it can be imported in controllers
const app = require("../app.js");
require("dotenv").config();

app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Parse URL-encoded bodies

// login state preservation across diffrent routes and refreshes
app.use(
  session({
    secret: process.env.SESSIONKEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 8 * 60 * 60 * 1000 }, // took to long solve
  })
);

// brother helped me
// middleware to pass loggedInUser object between all requests
app.use(function (req, res, next) {
  // next passes control to the next middleware
  // as req.session cannot be accessed in .ejs view files we store loggedInUser in res.locals
  res.locals.loggedInUser = req.session.loggedInUser;
  next();
  // res.send("hello world");
});

// login

app.get("/login", (req, res) => {
  res.render("login");
  // res.send('hello')
});

// post
app.post("/login", async (req, res) => {
  // mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')
  if (!req.body.email || !req.body.password) {
    // show error message to user if email or password empty
    res.render("login", { emptyData: true });
  } else {
    const user1 = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user1) {
      req.session.loggedInUser = user1; // Set session identifier

      res.redirect("/blogs");
    } else {
      res.render("login", { wrongData: true });
    }
  }
});

// sign up

app.get("/signup", (req, res) => {
  res.render("signup");
  // res.send('hello')
});

app.post("/signup", async (req, res) => {
  // mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.render("signup", { error: "Wrong username, email or password." });
  } else {
    const user1 = await User.findOne({
      email: req.body.email,
    });
    if (user1) {
      // if user already exist

      res.render("signup", { error: "User with same email already exists." });
    } else {
      const newUser = await User.create({
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      req.session.loggedInUser = newUser;
      res.redirect("/blogs");
      //   res.render("signup", { error: true });
    }
  }
});

// logout route
app.get("/logout", (req, res) => {
  req.session.loggedInUser = null;
  res.redirect("/");
  // res.send('hello')
});
