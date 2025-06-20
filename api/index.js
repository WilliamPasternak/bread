const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const connectDB = require('../config/database');  // import  connectDB
const mainRoutes = require('../routes/main');

const app = express();

// Wrap app with serverless
let serverlessHandler;

const getHandler = async () => {
  if (!serverlessHandler) {
    await connectDB();             // await DB connection once
    serverlessHandler = serverless(app);  // create handler after DB connected
  }
  return serverlessHandler;
};

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files served first
app.use(express.static(path.join(__dirname, '../public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Session setup


app.use(session({
  secret: 'foo',
  store: MongoStore.create(options)
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Handle favicon requests early to avoid 500 errors
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Routes
app.use('/', mainRoutes);

// Optional: 404 handler
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});



module.exports = async (event, context) => {
  const handler = await getHandler();
  return handler(event, context);
};

