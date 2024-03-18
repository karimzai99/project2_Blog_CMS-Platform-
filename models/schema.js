// Require the Mongoose package
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
// Seeding 
const seedDB = async () => {
  const usersCount = await User.countDocuments({});
  let user1;
  if (usersCount == 0) {
    user1 = await User.create({
      userName: "ahmad",
      email: "ahmad@gmail.com",
      password: "ahmad123",
    });
  }
  const blogCount = await Blog.countDocuments({});

  if (blogCount == 0) {
    Blog.create({
      title: "my first blog",
      createdBy: user1,
    });
    Blog.create({
      title: "my second blog",
      createdBy: user1,
    });
  }
};

seedDB();
// Export your schema as a Monogoose model.
// The Mongoose model will be accessed in `models/index.js`
module.exports = { User, Blog, Post };
