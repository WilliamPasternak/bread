const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("share.ejs", { posts: posts, user: req.user, title: 'bread | Share Your Salary' });
      //res.render("profile.ejs", { posts: posts, user: req.user, title: 'bread | Share Your Salary' });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const post = await Post.findById(req.params.id);
      res.render("feed.ejs", { posts: posts, post: post,title: 'bread | Recent Salaries' });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments, title: 'Post Title' });
    } catch (err) {
      console.log(err);
    }
  },
 

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Flaged");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },



  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary (MAKE THIS OPTIONAL)     
        // const result = await cloudinary.uploader.upload(req.file.path);
  
      await Post.create({
        //image: result.secure_url, (MAKE THIS OPTIONAL)
        //cloudinaryId: result.public_id,
        user: req.user.id,
        location: req.body.location,
        type: req.body.type,
        name: req.body.name,
        title: req.body.title,
        payType: req.body.payType,
        base: req.body.base,
        extraPay: req.body.extraPay,
        benefits: req.body.benefits,
        shiftLength: req.body.shiftLength,
        numShifts: req.body.numShifts,
        slowTips: req.body.slowTips,
        busyTips: req.body.busyTips,
        cashTips: req.body.cashTips,
        gender: req.body.gender,
        ethnicity: req.body.ethnicity,
        age: req.body.age,
        sameShifts: req.body.sameShifts,
        comments: req.body.comments,
        likes: 0,
        approved: false,
        verified: false,
      });
      console.log("Wages has been submitted!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  }, 

  
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
