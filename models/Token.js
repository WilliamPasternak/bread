const mongoose = require('mongoose')

console.log("Mongoose")
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
      //expires: '1m',
      index: { expires: '1m' },
      default: Date.now
    },
})
  
module.exports = mongoose.model('Token', tokenSchema)
