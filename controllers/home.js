const Post = require("../models/Post");

/*
module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs",{ title: 'bread | Pay Transparency for the Hospitality Industry' });
  },
};
*/

/*
module.exports = {
  getIndex: (req, res) => {
  try {
    res.render("index.ejs",{ title: 'bread | Pay Transparency for the Hospitality Industry' });
  } catch (err) {
    console.log(err);
  }
}}

*/


module.exports = {
  getIndex: async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.render("index.ejs",{ title: 'bread | Pay Transparency for the Hospitality Industry', posts: posts });
  } catch (err) {
    console.log(err);
  }
}}

/*
getFeed: async (req, res) => {
  try {
    const posts = await Post.find().lean();
    const post = await Post.findById(req.params.id);
    res.render("feed.ejs", { posts: posts, post: post,title: 'bread | Recent Salaries' });
  } catch (err) {
    console.log(err);
  }
},

*/