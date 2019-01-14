// Import user model
User = require('./../mocks/userModel');
var bcryptjs = require('bcryptjs');
// For password hash
const saltRounds = 10;

// Handle index actions
exports.index = (req, res) => {
    User.get((err, users) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

// Handle create user actions
exports.new = (req, res) => {
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name;
    user.password = req.body.password;    

    // Save the user and check for errors
    user.save((err) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            message: 'New user created!',
            data: user
        });
    });
};

// Handle view user info
exports.view = (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'User details loading...',
            data: user
        });
    });
};

// Handle update user info
exports.update = (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            res.send(err);
        }
        user.name = req.body.name ? req.body.name : user.name;
        user.password = req.body.password;

        // save the user and check for errors
        user.save((err) => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};

// Handle delete user
exports.delete = (req, res) => {
    User.remove({ _id: req.params.user_id }, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};