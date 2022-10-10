const Post = require("../models/Post");

module.exports = {
  getIndex: async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.render("index.ejs",{ title: 'bread | Pay Transparency for the Hospitality Industry', posts: posts, user: req.user}); //user:user,  
  } catch (err) {
    console.log(err);
  }
},
getIndexES: async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.render("es/index.ejs",{ title: 'bread | Pay Transparency for the Hospitality Industry', posts: posts, user: req.user}); //user:user,  
  } catch (err) {
    console.log(err);
  }
},
getIndexFR: async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.render("fr/index.ejs",{ title: 'bread | Pay Transparency for the Hospitality Industry', posts: posts, user: req.user}); //user:user,  
  } catch (err) {
    console.log(err);
  }
}
}