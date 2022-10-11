const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  location: {
    type: String,
    required: true,
  },
   type: {
    type: String,
    require: true,
  }, 
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  payType: {
    type: String,
    required: true,
  },
  base: {
    type: String,
    required: true,
  },
  extraPay: {
    type: String,
    required: false,
  },
  benefits: {
    type: String,
    required: false,
  },
  shiftLength: {
    type: String,
    required: true,
  },
  numShifts: {
    type: String,
    required: true,
  },
  slowTips: {
    type: String,
    required: false,
  },
  busyTips: {
    type: String,
    required: false,
  },
  cashTips: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  ethnicity: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: false,
  },
  sameShifts: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  flagged: { 
    type: Number,
    required: true,
  },
  familyMeal: { 
    type: String,
    required: false,
  },
  breaks: { 
    type: String,
    required: false,
  },
  overTime: { 
    type: String,
    required: false,
  },
  poolHouse: { 
    type: String,
    required: false,
  },
  fullTips: { 
    type: String,
    required: false,
  },
  orientation: { 
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", PostSchema);