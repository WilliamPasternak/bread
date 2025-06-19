const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const mainRoutes = require('../routes/main');

const app = express();

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
  secret: process.env.SESSION_SECRET || 'yourSecret',
  resave: false,
  saveUninitialized: false,
  // store: add your session store here
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', mainRoutes);

// Optional: 404 handler
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

module.exports = serverless(app);