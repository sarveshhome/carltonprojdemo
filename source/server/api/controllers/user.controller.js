'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('user');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.list_all_users = function(req, res) {
    console.log("get call for user data");
    User.find({}, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

exports.get_users = function(req, res) {
    var user = new User();
    user.userId = req.params.userId;
    console.log("get call for single user " + req.params.userId);
    User.find({ userId: req.params.userId }, function(err, result) {
        if (err) {
            res.send(err);
        }

        res.json(result);
    });

};

exports.create_new_user = function(req, res) {
    console.log("post call without pathparam");
    console.log("new change pathparam");
    var user = new User(req.body);
    console.log(req.body);
    console.log(JSON.stringify(user));
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save(function(err, result) {
                if (err) {
                    return res.json({ success: false, msg: 'Failed to register user' });
                }
                return res.json({ success: true, msg: 'User registered' });
            });
        });
    });
};

exports.authenticateUser = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
}

exports.profile = function(req, res, next) {
    console.log('request in profile');
    passport.authenticate('jwt', { session: false }), (req, res, next) => {
        res.json({ user: req.user }); //
    }
}

exports.update_user = function(req, res) {
    console.log("put with requestId in path")
};

exports.invalidate_user = function(req, res) {
    console.log("put call with requestId in path")
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}