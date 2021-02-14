const passport = require('passport');
const config = require('../config/settings');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

//Create a router for registering a new user via a provided username and password
router.post('/register', (req, res) => {
    if(!req.body.fullName || !req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please provide a full name, username, and password.'});
    } else {
        const newUser = new User ({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        });
        //save the user
        newUser.save(err => {
            if(err) {
                console.log(err)
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

//Create a router for allowing a user to login into the blog CMS via a username and password
router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if(err) throw err;

        if(!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            //Check if password matches
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(isMatch && !err) {
                    //If user is found and password is right create a token
                    const token = jwt.sign({data:user}, config.secret);

                    //Return the information including token as JSON
                    res.json({success: true, token: 'Bearer ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

//Create a router for logout
router.post('/logout', passport.authenticate('jwt', { session: false}), (req, res) => {
    req.logout();
    res.json({success: true});
});

module.exports = router;

