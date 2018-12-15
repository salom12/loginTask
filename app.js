/*
 * Express Example
 */

// Dependencies
const express = require('express');
const app = express();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const mongoose = require('mongoose');
const checkLogin = require('./middlewares/checkLogin');
require('dotenv').config()

//  Starting MongoDB connection
mongoose.connect('mongodb://admin:admin1234@ds249092.mlab.com:49092/mediavault', { useNewUrlParser: true });

//  To Check if the connection works fine or not
mongoose.connection.on('connected', () => {
  console.log('\x1b[36m%s\x1b[0m', 'mongo has been connected...');
});

// MiddleWare
app.use(express.json());
// For serving images and other static data
app.use(express.static('public'));
// Route MiddleWare for any route that start with (/api/user)
app.use('/api/user', usersRoutes);
app.use('/api/post', postRoutes);

// Home Router
app.get('/', checkLogin, (req, res) => {
  const token = jwt.sign({"name":"Hamdon", "age": 24}, process.env.JWT_SECRET);
  res.send(token);
})


// Starting the server
app.listen(3000, () => {
  console.log('Running on port 3000');
});
