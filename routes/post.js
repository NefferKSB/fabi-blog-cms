const passport = require('passport');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Post = require('../models/category');

//Add a route to GET the list of posts
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const token = getToken(req.headers);
    if(token) {
        Post.find((err, posts) => {
            if(err) return next(err);
            res.json(posts);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'});
    }
});

//Add a route to POST post data
router.post('/', passport.authenticate('jwt', { session: false}), (req, res, next) => {
    const token = getToken(req.headers);
    if(token) {
        Post.create(req.body, function (err, post) {
            if(err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

//Add a router to UPDATE post data by ID 
router.put('/:id', passport.authenticate('jwt', { session: false}), (req, res, next) => {
    const token = getToken(req.headers);
    if(token) {
        Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
            if(err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'});
    }
});

//Add a router to DELETE post data by ID
router.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res, next) => {
    const token = getToken(req.headers);
    if(token) {
        Post.findByIdAndRemove(req.params.id, req.body, (err, post) => {
            if(err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'});
    }
});

getToken = (headers) => {
    if(headers && headers.authorization) {
        const parted = headers.authorization.split(' ');
        if(parted.lenth === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;