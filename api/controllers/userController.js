// Import user and wardrobe models
User = require('./../models/userModel');
Wardrobe = require('./../models/wardrobeModel');

// Authentication
let jwt = require('jsonwebtoken');
let jwkToPem = require('jwk-to-pem');

// Handle index actions
exports.index = (req, res) => {
    User.get((err, users) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        }
    });
};

// Handle create user actions
exports.new = (req, res) => {
    var newuser = new User();
    newuser.username = req.body.username;
    // Save the user and check for errors
    newuser.save((err) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                message: 'New user created!',
                data: newuser
            });
        }
    });
};

// Handle view user info
exports.view = (req, res) => {
    jwt.verify(req.params.user_id, jwkToPem(res.locals.jwk.keys[1]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log(decoded);
            res.send(decoded)
        }
    });

    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            if(user) {
                res.json({
                    status: 'success',
                    message: 'User details loading...',
                    data: user
                });
            }
            else {
                res.json({
                    status: 'success',
                    message: 'There is no such user in existence.'
                });
            }
        }
    });
};

// Handle update user info
exports.update = (req, res) => {
    jwt.verify(req.params.user_id, jwkToPem(res.locals.jwk.keys[1]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log(decoded);
            res.send(decoded)
        }
    });
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            if(req.body.username) {
                user.username = req.body.username;
            }
            // save the user and check for errors
            user.save((err) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                else {
                    res.json({
                        message: 'User Info updated',
                        data: user
                    });
                }
            });
        }
    });
};

// Handle delete user
exports.delete = (req, res) => {
    jwt.verify(req.params.user_id, jwkToPem(res.locals.jwk.keys[1]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log(decoded);
            res.send(decoded)
        }
    });
    User.remove({ _id: req.params.user_id }, (err) => {
        if (err) {
            res.json({
                status: "User delete error",
                message: err,
            });
        }
        else {
            Wardrobe.deleteMany({
                owner_id: req.params.user_id
            })
            .exec((err) => {
                if(err) {
                    res.json({
                        status: "Wardrobe delete error",
                        message: err,
                    });
                }
                else {
                    res.json({
                        status: "success",
                        message: 'User and wardrobe deleted'
                    });
                }
            });
        }
    });
};