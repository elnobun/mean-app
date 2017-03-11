const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = Schema({
    name: {type: String},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
});

const User = module.exports = mongoose.model('User', UserSchema);

// Get User by ID
module.exports.getUserId = function (id, callback) {
    User.findById(id, callback);
};

// Get User by username
module.exports.getUsername = function (username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
};

// Add User, and hash user password for encryption
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if(err) throw (err);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

// Create the comparePassword function here from the /authenticate user route
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw (err);
        callback(null, isMatch);
    });
};