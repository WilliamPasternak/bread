const Post = require("../models/Post");

module.exports = {
  getIndex: async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.render("index.ejs",{ title: 'bread | Pay Transparency for the Hospitality Industry', 
     posts: posts, 
     user: req.user,
     description: "bread is a free resource for reviewing and sharing salary information for the hospitality industry. It is completely anonymous and crowd-sourced."}); 
  } catch (err) {
    console.log(err);
  }
},
getIndexES: async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.render("es/index.ejs",{ title: 'bread | Transparencia salarial para la industria hotelera',
     posts: posts, 
     user: req.user,
     description: " bread es un recurso gratuito para revisar y compartir información salarial para la industria hotelera. Es completamente anónimo y colaborativo. "
    });   
  } catch (err) {
    console.log(err);
  }
},
/*getIndexFR: async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.render("fr/index.ejs",{ title: 'bread | Pay Transparency for the Hospitality Industry', posts: posts, user: req.user}); //user:user,  
  } catch (err) {
    console.log(err);
  }
},*/
getComingSoon: async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.render("features.ejs",{ title: 'bread | Features ', posts: posts, user: req.user,
    description: 'We have already rolled out several features and have a few exciting ones planned. If you have any features you would like to see implemented, please share them with us.'
  });  
  } catch (err) {
    console.log(err);
  }
},

}