const mongoose = require('mongoose');

let cached = global.mongoose; // Reuse existing connection if cached

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(uri) {
  if (cached.conn) {
    return cached.conn;          // use existing connection
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // other options...
      })
      .then(mongo => {
        return mongo;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
