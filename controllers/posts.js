const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Verify = require("../models/Verify");
const Shift= require("../models/Shift");

module.exports = {
  getShare: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("share.ejs", { posts: posts, user: req.user, title: 'bread | Share Your Salary',
    description:'Share your salary to help transform the hospitality industry.' });
    } catch (err) {
      console.log(err);
    }
  }, 
  // Get Spanish Version of Share Page
        getShareES: async (req, res) => {
          try {
            const posts = await Post.find({ user: req.user.id });
            res.render("es/share.ejs", { posts: posts, user: req.user, title: 'bread | Comparte tu Salario',
          description: 'Comparte tu salario para ayudar a transformar la industria hotelera.' });
          } catch (err) {
            console.log(err);
          }
        },
  getVerified: async (req, res) => {
    try {
      const posts = await Verify.find({ user: req.user.id });
      res.render("verify.ejs", { posts: posts, user: req.user, title: 'bread | Verify Your Salary', 
      description: 'Salaries can be submitted with proof such as paystub, tip sheets or tax forms. Verified salaries will show up with a next to them on our Salaries page.'  });
    } catch (err) {
      console.log('not working')
      console.log(err);
    }
  },
   // Get Spanish Version of Verified Page
      getVerifiedES: async (req, res) => {
        try {
          const posts = await Verify.find({ user: req.user.id });
          res.render("es/verify.ejs", { posts: posts, user: req.user, title: 'bread | Verifique su Salario',
        description: 'Los salarios se pueden presentar con comprobantes, como talones de pago, hojas de propinas o formularios de impuestos. Los salarios verificados se mostrarán con un junto a ellos en nuestra página de Salarios.'  });
        } catch (err) {
          console.log('not working')
          console.log(err);
        }
      },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const post = await Post.findById(req.params.id);
      res.render("feed.ejs", { posts: posts, post: post, user: req.user, title: 'bread | Recent Salaries',
    description:'View salaries shared by hospitality employees near you.' });
      
    } catch (err) {
      console.log(err);
    }
  },
  // Get Spanish Version of Feed Page
        getFeedES: async (req, res) => {
          try {
            const posts = await Post.find().sort({ createdAt: "desc" }).lean();
            const post = await Post.findById(req.params.id);
            res.render("es/feed.ejs", { posts: posts, post: post, user: req.user, title: 'bread | Salarios Compartidos',
          description: 'Vea los salarios compartidos por los empleados de hospitalidad cerca de usted.' });
            
          } catch (err) {
            console.log(err);
          }
        },
  getProfile: async (req, res) => {
    try {
      const allShifts = await Shift.find({share: "true"}).sort({ createdAt: "desc" }).lean();
      const usersShifts = await Shift.find({ user: req.user.id }); 
      res.render("profile.ejs", { allShifts: allShifts, usersShifts: usersShifts, user: req.user, title: 'bread',
      description:'Track your earnings to see your daily averages and see what others are earning' });
      
    } catch (err) {
      console.log(err);
    }
  },
    // Get Spanish Version of Profile Page
        getProfileES: async (req, res) => {
          try {
            const allShifts = await Shift.find({share: "true"}).sort({ createdAt: "desc" }).lean();
            const usersShifts = await Shift.find({ user: req.user.id });
            
            res.render("es/profile.ejs", { allShifts: allShifts, usersShifts: usersShifts, user: req.user, title: 'bread',
            description: 'Realice un seguimiento de sus ganancias para ver sus promedios diarios y ver lo que otros están ganando' });
            
          } catch (err) {
            console.log(err);
          }
        },
 
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user,  title: `${post.title} at ${post.name} (${post.id})`,
      description: 'View more details about the user who submitted this salary and the company they work for' });

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


  addShift: async (req, res) => {
    try {
      await Shift.create({
        user: req.user.id,
        day: req.body.day,
        date: req.body.date,
        company: req.body.company,
        location: req.body.location,
        role: req.body.role,
        hoursWorked: req.body.hoursWorked,
        payPerHour: req.body.payPerHour,
        ccTips: req.body.ccTips,
        cashTips: req.body.cashTips,
        share: req.body.share,
        createdAt: req.body.createdAt,
        approved: req.body.approved,
        verified: req.body.verified,
        flagged:  0 
      });
     
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  }, 

  createPost: async (req, res) => {
    try {
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
        job: req.user.job,
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
       res.render("edit.ejs", { post: post, user: req.user, title: 'Edit your post',
      description: 'Edit your post' });
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

  // Delete Post

  deletePost: async (req, res) => {
    try {
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },


deleteShift: async (req, res) => {
  try {
    await Shift.remove({ _id: req.params.id });
    console.log("Deleted Shift");
    res.redirect("/profile");
  } catch (err) {
    res.redirect("/profile");
  }
},

};

