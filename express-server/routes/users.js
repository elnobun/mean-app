const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/user');

const router = express.Router();

// Register
router.post('/register', function (req, res, next) {
    let newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    // Add the user to the database
    User.addUser(newUser, function (err, user) {
        if (err) {
            res.json({
                success: false,
                msg: 'failed to register user'
            });
        } else {
            res.json({
                success: true,
                msg: 'user is registered'
            });
        }
    });
});

// Authenticate
router.post('/authenticate', function (req, res, next) {
    // Get the username and password that is being submitted
    const username = req.body.username;
    const password = req.body.password;

    // Get the user by the username
    User.getUsername(username, function (err, user) {
        if (err) throw (err);

        // If there is no user
        if (!user){
            return res.json({
                success: false,
                msg: 'User not found'
            });
        }

        // If there is a User, then we will go ahead to check the user password, and match
        // if there is a Match, we will get the user token
        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) throw (err);
            if (isMatch){
                const token = jwt.sign(user, config.secret, {
                   expiresIn: 604800 // 1 week worth of seconds
                });
                res.json({
                    success: true,
                    token: 'JWT ' +token,
                    //create our own user object to be returned because we do not want to return the password
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                res.json({
                    success: false,
                    msg: 'Wrong password'
                });
            }
        });
    });
});

// Profile route and protect it
router.get('/profile', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    res.json({
       user: req.user
    });
});


// Export Router
module.exports = router;
