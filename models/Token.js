const mongoose = require('mongoose')


const tokenSchema = new mongoose.Schema({
    Token: {
      type: String,
      required: true,
    },
    email: {
      type: String, 
      unique: true,
      required: true 
    },
    createdAt: {
      type: Date,
      expires: 3600,
      default: Date.now
    },
})

module.exports = mongoose.model('Token', tokenSchema)
