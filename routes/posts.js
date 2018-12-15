


// Dependencies
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const Post = require('../models/post');
const checkLogin = require('../middlewares/checkLogin');


router.get('/', checkLogin, (req, res) => {
  const posts = Post.find().then(posts => {
    res.send(posts);
  });
});


// Adding a new Post
router.post('/', checkLogin, (req, res) => {
  const post = new Post({
    user: req.body.user_id,
    title: req.body.title,
    description: req.body.description,
  });
  post.save().then(result => {
    res.send(result);
  }).catch(err =>{
    res.send(err);
    }
  )
});


router.get('/user/:id', checkLogin, (req, res) => {
  Post.find({user: req.params.id})
  .populate('user') //  Getting the user info because we have set a ref in the Post Schema
  .then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err);
  })
});

router.get('/:id', checkLogin, (req, res) => {
  Post.findById(req.params.id)
  .populate('user') //  Getting the user info because we have set a ref in the Post Schema
  .then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err);
  })
});





module.exports = router;
