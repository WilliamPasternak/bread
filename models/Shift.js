const mongoose = require("mongoose");
const ShiftSchema = new mongoose.Schema({

  day: {
    type: String,
    required: true,
  },

 date: {
  type: String,
  required: true,
 },
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  hoursWorked: {
    type: Number,
    required: true,
  },
  payPerHour: {
    type: Number,
    required: true,
  },
  ccTips: {
    type: Number,
    required: false,
  },
  cashTips: {
    type: Number,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Shift", ShiftSchema);
