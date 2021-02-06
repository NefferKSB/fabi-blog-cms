const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Category = require('../models/category');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Get all categories
router.get('/category', (req, res, next) => {
  Category.find((err, categories) => {
    if(err) return next(err);
    res.json(categories);
  });
});

//Get category by ID
router.get('/bycategory/:id', (req, res, next) => {
  Post.find({category: req.params.id}, (err, posts) => {
    if(err) return next(err);
    res.json(posts);
  });
});

//Get all posts
router.get('/post', (req, res, next) => {
  Post.find((err, posts) => {
    if(err) return next(err);
    res.json(posts);
  });
});

//Get post by ID
router.get('/post/:id', (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if(err) return next(err);
    res.json(post);
  });
});

module.exports = router;
