const express = require("express");
const mongoose = require("mongoose");

const passport = require("passport");

require("dotenv").config();

const app = express();

app.set("view engine", "ejs")

// MongoDB Connection

const DBURI = process.env.MONGODBURI;

mongoose.connect(DBURI);

const db = mongoose.connection;

module.exports = {db: db}

db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});



// Middleware

// Routes

app.get('/', (req, res) => {
    res.render('index' )
    // res.send('hello')
})

// login

app.get('/login', (req, res) => {
    res.render('login' )
    // res.send('hello')
})

// sign up 

app.get('/signup', (req, res) => {
    res.render('signup' )
    // res.send('hello')
})


// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});