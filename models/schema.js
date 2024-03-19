// Require the Mongoose package
// took a little bit diffrent approach my brother help me out with this. for defualt we hardCoded some data.. 
const mongoose = require("mongoose");

// create a new Schema
// This will define the shape of the documents in the collection
// https://mongoosejs.com/docs/guide.html
const blogSchema = new mongoose.Schema(
  {
    title: String,
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
const Blog = mongoose.model("Blog", blogSchema);

const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    blogId: { type: mongoose.Types.ObjectId, ref: "Blog" },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

// Seeding function 
const seedDB = async () => {
 // helped from Borther
  const usersCount = await User.countDocuments({});
  let user1;
  let blog1;
  if (usersCount == 0) {
    user1 = await User.create({
      userName: "ahmad",
      email: "ahmad@gmail.com",
      password: "ahmad123",
    });
  }
  const blogCount = await Blog.countDocuments({});
  if (blogCount == 0) {
    // hard coded the first blogs for test and also if there is no data at all. 
    blog1 = await Blog.create({
      title: "my first blog",
      createdBy: user1,
    });
    Blog.create({
      title: "my second blog",
      createdBy: user1,
    });
  }
  
  const postCount = await Post.countDocuments({});
  if (postCount == 0) {
    // hard coded if data is zoro in database
    Post.create({
      title: "This is the first article",
      body: "This is the body text. 11111 This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. \nThis is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. \nThis is the body text. This is the body text. This is the body text. This is the body text. ",
      createdBy: user1,
      blogId: blog1,
    });
    Post.create({
      title: "This is the second article",
      body: "This is the body text. 2222222 This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. \nThis is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. \nThis is the body text. This is the body text. This is the body text. This is the body text. ",
      createdBy: user1,
      blogId: blog1,
    });
    Post.create({
      title: "This is the third article",
      body: "This is the body text. 33333 This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. \nThis is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. This is the body text. \nThis is the body text. This is the body text. This is the body text. This is the body text. ",
      createdBy: user1,
      blogId: blog1,
    });
  }
};

seedDB(); // invoked 


// Export your schema as a Monogoose model.

module.exports = { User, Blog, Post };
