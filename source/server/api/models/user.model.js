'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../../config/database');

var UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    address: String,
    pin: Number,
    nationality: {
        type: String,
        default: 'Indian'
    },
    email: String,
    dob: {
        type: Date
    },
    otherContact: [String],
    password: {
        type: String,
        default: 'password'
    },
    image: String,
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['unregistered', 'registered', 'active', 'inactive', 'blocked']
        }],
        default: ['registered']
    }
});

const User = module.exports = mongoose.model('user', UserSchema);
/*
add another schema here
 */

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    console.log('getUserByUsername inside ' + username)
    const query = { mobile: username }
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}