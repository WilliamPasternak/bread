const mongoose = require("mongoose");

const VerifySchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company:{
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("Verify", VerifySchema);
