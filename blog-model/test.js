const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

dotenv.config();

const testData = async () => {
  await connectDB();

  // Clear old data
  await User.deleteMany();
  await Post.deleteMany();
  await Comment.deleteMany();

  // Create user
  const user = await User.create({
    name: "Ganesh",
    email: "ganesh@test.com",
    password: "123456"
  });

  // Create post
  const post = await Post.create({
    title: "My First Blog",
    content: "This is my first post",
    author: user._id,
    tags: ["coding", "nodejs"]
  });

  // Create comment
  const comment = await Comment.create({
    text: "Nice blog!",
    post: post._id,
    user: user._id
  });

  console.log("? Data Inserted Successfully");
  process.exit();
};

testData();
