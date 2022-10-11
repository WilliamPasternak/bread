const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Verify = require("../models/Verify");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("share.ejs", { posts: posts, user: req.user, title: 'bread | Share Your Salary' });
    } catch (err) {
      console.log(err);
    }
  },
  getVerified: async (req, res) => {
    try {
      const posts = await Verify.find({ user: req.user.id });
      res.render("verify.ejs", { posts: posts, user: req.user, title: 'bread | Verify Your Salary'  });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const post = await Post.findById(req.params.id);
      res.render("feed.ejs", { posts: posts, post: post, user: req.user, title: 'bread | Recent Salaries' });
      
    } catch (err) {
      console.log(err);
    }
  },
 

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user,  title: `${post.title} at ${post.name} (${post.id})` });

    } catch (err) {
      console.log(err);
    }
  },

    flagPost: async (req, res) => {

    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { flagged: 1 },
        }
      );
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
        flagged: 0,
        approved: req.body.approved,
        verified: req.body.verified,
        familyMeal: req.body.familyMeal,
        breaks:  req.body.breaks,
        overTime: req.body.overTime,
        poolHouse: req.body.poolHouse,
        fullTips: req.body.fullTips,
        orientation: req.body.orientation,
      });
     
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  }, 

  verifyPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Verify.create({
        image: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user.id,
      });
      console.log("Verification has been submitted!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },



  editPost: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const post = await Post.findById(req.params.id);

      if(!post){
        res.redirect('feed.ejs')
      }

      if(post.user != req.user.id){ 
      res.redirect("/feed")

      } else {
       res.render("edit.ejs", { post: post, user: req.user, title: 'Edit your post' });
      }
    } catch (err) {
      console.log(err);
    }
  },

  // Update Post
  updatePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id }, req.body
      );
      res.redirect("/feed")
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      // let post = await Post.findById({ _id: req.params.id });
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