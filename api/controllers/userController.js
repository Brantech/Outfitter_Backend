// Import user model
User = require('./../mocks/userModel');
var bcryptjs = require('bcryptjs');
// For password hash
const saltRounds = 10;

// Handle index actions
exports.indexUsers = (req, res) => {
    User.get((err, users) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            users
        });
    });
};

// Handle create user actions
exports.newUser = (req, res) => {
    var user = new User();
    user.username = req.body.username ? req.body.username : user.username;
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName;
    user.email = req.body.email;
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
            user
        });
    });
};

// Handle view user info
exports.viewUser = (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json({
            user
        });
    });
};

// Handle update user info
exports.updateUser = (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            res.send(err);
        }
        user.username = req.body.username ? req.body.username : user.username;
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName;
        user.email = req.body.email;
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
exports.deleteUser = (req, res) => {
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