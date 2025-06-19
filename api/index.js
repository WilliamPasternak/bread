const express = require('express');
const serverless = require('serverless-http');
const app = express();
const mainRoutes = require('../routes/main'); // Adjust if needed

// Middleware, views, static, etc.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', mainRoutes);

module.exports.handler = serverless(app);
