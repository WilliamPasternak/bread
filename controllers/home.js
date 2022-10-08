const Post = require("../models/Post");

// Not sure If I need below
const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");



module.exports = {
  getIndex: async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.render("index.ejs",{ title: 'bread | Pay Transparency for the Hospitality Industry', posts: posts, user: req.user}); 
  } catch (err) {
    console.log(err);
  }
}}

// Added user: user above and const User.